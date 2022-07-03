import { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

import AuthService from "@services/auth";
import utils from "@utils/index";
import clearState from "@utils/clearState";
import { useAppDispatch } from "@store/functions";

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
            clearState();
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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const evmWalletAddresses = await provider.send("eth_requestAccounts", []);

      // Sign Message
      const signer = provider.getSigner();
      const nonce = await AuthService.getNonce({ evmAddress: evmWalletAddresses[0] });
      const signature = await signer.signMessage(nonce);
      utils.setAppLoading(true, "Assets are loading");
      const evmAddress = await signer.getAddress();

      // Verify  Message
      const signerAddress = ethers.utils.verifyMessage(nonce, signature);
      if (signerAddress !== evmAddress) {
        setIsConnecting(false);
        throw new Error("Your message could not be verified!");
      }
      const user = await AuthService.validateSignature({
        evmAddress,
        nonce,
        signature,
      });
      setIsConnecting(false);
      dispatch({
        type: "SET_EVM_ADDRESS",
        payload: {
          data: user.keyIdentifier,
        },
      });
      if (user.ensName) {
        dispatch({
          type: "SET_ENS_NAME",
          payload: {
            data: user.ensName,
          },
        });
      }
      if (user.lastAssetUpdate) {
        dispatch({
          type: "SET_LAST_ASSET_UPDATE",
          payload: {
            data: user.lastAssetUpdate,
          },
        });
      }
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
    } finally {
      setIsConnecting(false);
      utils.setAppLoading(false);
    }
  };

  const disconnectMetamask = async () => {
    try {
      await AuthService.logout();
      clearState();
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
