import React, { useEffect } from "react";
import "./Header.scss";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from 'web3';

import Metamask from "../../assets/metamask.png";
import { ACTIONS } from "../../state/actions";
import { truncateEthAddress } from "../../utils";

const web3 = new Web3(window.ethereum);

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
  const [disabled, setDisabled] = React.useState("");
  const [connecting, setConnecting] = React.useState(false);

  const dispatch = useDispatch();
  const evmAddress = useSelector((state) => state.evmAddress);

  const requestMetamaskToConnect = async () => {
    try {
      setDisabled(true);
      setConnecting(true);
      const accounts = await web3.eth.requestAccounts();
      setDisabled(false);
      setConnecting(false);
      dispatch({
        type: ACTIONS.SET_EVM_ADDRESS,
        payload: {
          data: accounts[0],
        },
      });
    } catch (error) {
      if (error?.code !== 4001) {
        toast.error(error.message);
      }
      setDisabled(false);
      setConnecting(false);
    }
  };

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

  const renderTooltip = (props) => {
    if (evmAddress)
      return (
        <Tooltip id="button-tooltip" {...props}>
          <div className="metamask-tooltip">
            Click to disconnect
          </div>
        </Tooltip>
      );
    return (
      <Tooltip id="button-tooltip" {...props}>
        This will be your key identifier
      </Tooltip>
    );
  };

  const metamaskSwitchAccountHandler = (accounts) => {
    if (accounts.length > 0 && evmAddress && evmAddress !== accounts[0]) {
      dispatch({
        type: ACTIONS.SET_EVM_ADDRESS,
        payload: {
          data: accounts[0],
        },
      });
    } else {
      dispatch({
        type: ACTIONS.SET_EVM_ADDRESS,
        payload: {
          data: "",
        },
      });
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

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      metamaskSwitchAccountHandler(accounts)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              !connecting &&
              `Connected to ${truncateEthAddress(evmAddress)}`}
            {!evmAddress && connecting && "Connecting..."}
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

Header.whyDidYouRender = true;
