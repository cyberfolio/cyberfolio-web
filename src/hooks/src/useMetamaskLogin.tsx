import React from "react";

import { ethers } from "ethers";
import { toast } from "react-hot-toast";

import AppServices from "services";
import AppUtils from "utils";
import AppConfig from "config";
import { getAccount, signMessage } from "@wagmi/core";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import AppHooks from "hooks";

const useMetamaskLogin = () => {
  const dispatch = AppHooks.useAppDispatch();
  const [isConnecting, setIsConnecting] = React.useState(false);
  const { connectAsync } = useConnect();

  const signAndVerifyMessageV2 = async () => {
    try {
      setIsConnecting(true);
      const result = await connectAsync({ connector: injected() });
      const evmAddress = result.accounts[0];
      const nonce = await AppServices.AUTH.getNonce({ evmAddress });

      const { connector } = getAccount(AppConfig.Wagmi);
      const signature = await signMessage(AppConfig.Wagmi, {
        connector,
        message: nonce,
      });
      const signerAddress = ethers.verifyMessage(nonce, signature);
      if (signerAddress !== evmAddress) {
        setIsConnecting(false);
        throw new Error("Your message could not be verified!");
      }
      AppUtils.setAppLoading(true, "Assets are loading");

      const user = await AppServices.AUTH.validateSignature({
        evmAddress,
        nonce,
        signature,
      });
      dispatch({
        type: "SET_EVM_ADDRESS",
        payload: user.keyIdentifier,
      });
      if (user.ensName) {
        dispatch({
          type: "SET_ENS_NAME",
          payload: user.ensName,
        });
      }
      if (user.lastAssetUpdate) {
        dispatch({
          type: "SET_LAST_ASSET_UPDATE",
          payload: user.lastAssetUpdate,
        });
      }
      setIsConnecting(false);
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
    } finally {
      setIsConnecting(false);
      AppUtils.setAppLoading(false);
    }
  };

  const disconnectMetamask = async () => {
    try {
      await AppServices.AUTH.logout();
      AppUtils.clearState();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return {
    isConnecting,
    signAndVerifyMessageV2,
    disconnectMetamask,
  };
};

export default useMetamaskLogin;
