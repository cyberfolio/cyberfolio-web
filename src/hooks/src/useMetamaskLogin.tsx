import React from "react";

import { ethers } from "ethers";
import { toast } from "react-hot-toast";

import AppServices from "services";
import AppUtils from "utils";
import AppConfig from "config";
import { useAppDispatch } from "store/functions";
import { getAccount, signMessage } from "@wagmi/core";

const useMetamaskLogin = () => {
  const dispatch = useAppDispatch();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const signAndVerifyMessage = async () => {
    try {
      setIsConnecting(true);

      // Connect Metamask
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const evmWalletAddresses = await provider.send("eth_requestAccounts", []);

      const { connector, address } = getAccount(AppConfig.RainbowKit);

      if (!address) {
        throw new Error("Please connect your wallet!");
      }

      // Sign Message
      // const signer = await provider.getSigner();
      const nonce = await AppServices.AUTH.getNonce({ evmAddress: address });
      // const signature = await signer.signMessage(nonce);
      const signature = await signMessage(AppConfig.RainbowKit, {
        connector,
        message: nonce,
      });
      AppUtils.setAppLoading(true, "Assets are loading");
      // const evmAddress = await signer.getAddress();

      // Verify  Message
      const signerAddress = ethers.verifyMessage(nonce, signature);
      if (signerAddress !== address) {
        setIsConnecting(false);
        throw new Error("Your message could not be verified!");
      }
      const user = await AppServices.AUTH.validateSignature({
        evmAddress: address,
        nonce,
        signature,
      });
      setIsConnecting(false);
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
    signAndVerifyMessage,
    disconnectMetamask,
  };
};

export default useMetamaskLogin;
