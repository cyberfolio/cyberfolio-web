import React, { useEffect, useState } from "react";
import "./Header.scss";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import detectEthereumProvider from "@metamask/detect-provider";

import Metamask from "../../assets/metamask.png";
import { ACTIONS } from "../../state/actions";
import { truncateEthAddress } from "../../utils";
import { useMetamaskLogin } from "./useMetamaskLogin";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-brand">Cyberfolio</div>
        <ConnectWallet />
      </div>
    </div>
  );
};

const ConnectWallet = () => {
  const [disabled, setDisabled] = useState("");
  const [connecting, setConnecting] = useState(false);
  const dispatch = useDispatch();
  const evmAddress = useSelector((state) => state.evmAddress);
  const { isConnected } = useMetamaskLogin(connecting);

  useEffect(() => {
    if (isConnected) {
      setDisabled(false);
      setConnecting(false);
    }
  }, [isConnected]);

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

  const requestMetamaskToConnect = async () => {
    setDisabled(true);
    setConnecting(true);
  };

  const renderTooltip = (props) => {
    if (evmAddress)
      return (
        <Tooltip id="button-tooltip" {...props}>
          <div className="metamask-tooltip">Click to disconnect</div>
        </Tooltip>
      );
    return (
      <Tooltip id="button-tooltip" {...props}>
        This will be your key identifier
      </Tooltip>
    );
  };

  const disconnectMetamask = () => {
    dispatch({
      type: ACTIONS.SET_EVM_ADDRESS,
      payload: {
        data: "",
      },
    });
  };

  return (
    <div className="metamask">
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 50, hide: 100 }}
        overlay={renderTooltip}
      >
        <div className={`metamask-button ${disabled ? "disabledbutton" : ""}`}>
          <img className="metamask-button-img" src={Metamask} alt="metamask" />
          {evmAddress ? <span className="connectedDot"></span> : <></>}
          <div
            className="metamask-button-text"
            onClick={
              !evmAddress ? requestMetamaskToConnect : disconnectMetamask
            }
          >
            {!evmAddress && !connecting && "Connect Metamask"}
            {evmAddress &&
              isConnected &&
              `Connected to ${truncateEthAddress(evmAddress)}`}
            {!evmAddress && connecting && "Connecting..."}
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

Header.whyDidYouRender = true;
