import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../state/actions";

let message = "I confirm that I'm the owner of this wallet";

export const useMetamaskLogin = () => {
  const dispatch = useDispatch();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectedSuccessfully, setIsConnectedSuccessfully] = useState(false);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        startApp(provider);
      } else {
        toast.error("Please install MetaMask!");
      }
      function startApp(provider) {
        if (provider !== window.ethereum) {
          toast.error("Do you have multiple wallets installed?");
        }
      }
    };
    init();
  }, []);

  const signAndVerifyMessage = async () => {
    try {
      setIsConnecting(true);
      // Connect Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // Sign Message
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const walletAddress = await signer.getAddress();

      // Verify  Message
      const signerAddress = ethers.utils.verifyMessage(message, signature);
      if (signerAddress === walletAddress) {
        setIsConnectedSuccessfully(true);
        setIsConnecting(false);
        toast.success("Successfully logged in!");
        dispatch({
          type: ACTIONS.SET_EVM_ADDRESS,
          payload: {
            data: signerAddress,
          },
        });
      } else {
        setIsConnecting(false);
        setIsConnectedSuccessfully(false);
        toast.error("Your message could not be verified!");
      }
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
      setIsConnectedSuccessfully(false);
      setIsConnecting(false);
    }
  };

  const disconnectMetamask = () => {
    dispatch({
      type: ACTIONS.SET_EVM_ADDRESS,
      payload: {
        data: "",
      },
    });
  };

  return {
    isConnecting,
    isConnectedSuccessfully,
    signAndVerifyMessage,
    disconnectMetamask,
  };
};
