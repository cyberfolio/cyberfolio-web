import { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

import AuthService from "services/auth";
import AppUtils from "utils/index";
import { useAppDispatch } from "store/functions";
import { getAccount, signMessage } from "@wagmi/core";
import AppConfig from "config";

export const useMetamaskLogin = () => {
  const dispatch = useAppDispatch();
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfMetamaskPresent = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        throw new Error("Do you have multiple wallets installed?");
      }
    } else {
      throw new Error("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        if (accounts?.length === 0) {
          try {
            await AuthService.logout();
            AppUtils.clearState();
          } catch (e) {
            toast.error(e.message);
          }
        }
      });
    }
  }, []);

  const signAndVerifyMessage = async () => {
    try {
      await checkIfMetamaskPresent();
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
      const nonce = await AuthService.getNonce({ evmAddress: address });
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
      const user = await AuthService.validateSignature({
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
      await AuthService.logout();
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
