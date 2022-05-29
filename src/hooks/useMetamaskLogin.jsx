import { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Actions from "../store/actions";
import { getNonce, logout, validateSignature } from "../services/auth";
import { setAppLoading } from "../utils";
import clearState from "../utils/clearState";

export const useMetamaskLogin = () => {
  const dispatch = useDispatch();
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfMetamaskPresent = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      startApp(provider);
    } else {
      throw new Error("Please install MetaMask!");
    }
    function startApp(provider) {
      if (provider !== window.ethereum) {
        throw new Error("Do you have multiple wallets installed?");
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts?.length === 0) {
          try {
            await logout();
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
      const nonce = await getNonce({ evmAddress: evmWalletAddresses[0] });
      const signature = await signer.signMessage(nonce);
      setAppLoading(true);
      const evmAddress = await signer.getAddress();

      // Verify  Message
      const signerAddress = ethers.utils.verifyMessage(nonce, signature);
      if (signerAddress !== evmAddress) {
        setIsConnecting(false);
        throw new Error("Your message could not be verified!");
      }
      await validateSignature({
        evmAddress,
        nonce,
        signature,
      });
      setIsConnecting(false);
      dispatch({
        type: Actions.SET_EVM_ADDRESS,
        payload: {
          data: signerAddress,
        },
      });
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
      setIsConnecting(false);
    } finally {
      setAppLoading(false);
    }
  };

  const disconnectMetamask = async () => {
    try {
      await logout();
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
