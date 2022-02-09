import { useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../state/actions";
import { useState } from "react";

export const useMetamaskLogin = (isRequested) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isRequested) {
      return;
    }
    signMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRequested]);

  const signMessage = async () => {
    let message = "I confirm that I'm the owner of this wallet";
    try {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = signer.signMessage(message);
      const address = await signer.getAddress();
      verifyMessage({ message, address, signature });
      return {
        signature,
        address,
      };
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
    }
  };

  const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddress = await ethers.utils.verifyMessage(
        message,
        signature
      );
      if (signerAddress === address) {
        toast.success("Successfully logged in!");
        setIsConnected(true);
        dispatch({
          type: ACTIONS.SET_EVM_ADDRESS,
          payload: {
            data: address,
          },
        });
      } else {
        setIsConnected(false);
        toast.error("Your message could not be verified!");
      }
    } catch (e) {
      setIsConnected(false);
      toast.error(e.message);
    }
  };

  return {
    isConnected,
  };
};
