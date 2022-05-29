import React, { useEffect, useState } from "react";
import "./index.scss";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

import Metamask from "../../assets/metamask.png";
import { truncateEthAddress } from "../../utils";
import { useMetamaskLogin } from "../../hooks/useMetamaskLogin";
import InfoService from "../../services/info";

const Index = () => {
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
  const evmAddress = useSelector((state) => state.evmAddress);
  const [ensName, setEnsName] = useState("");

  const { isConnecting, signAndVerifyMessage, disconnectMetamask } =
    useMetamaskLogin();

  const resolveEnsName = async () => {
    try {
      const name = await InfoService.getEnsName();
      setEnsName(name);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (evmAddress) {
      resolveEnsName();
    }
  }, [evmAddress]);

  const renderTooltip = (props) => {
    if (evmAddress)
      return (
        <Tooltip id="button-tooltip" {...props}>
          <div className="metamask-tooltip">Click to disconnect</div>
        </Tooltip>
      );
    return (
      <Tooltip id="button-tooltip" {...props}>
        The account you choose will be your key identifier
      </Tooltip>
    );
  };

  return (
    <div className="metamask">
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 50, hide: 100 }}
        overlay={renderTooltip}
      >
        <div
          className={`metamask-button ${isConnecting ? "disabledbutton" : ""}`}
          onClick={!evmAddress ? signAndVerifyMessage : disconnectMetamask}
        >
          <img className="metamask-button-img" src={Metamask} alt="metamask" />
          {evmAddress ? <span className="connectedDot"></span> : <></>}
          <div className="metamask-button-text">
            {!evmAddress && !isConnecting && "Connect Metamask"}
            {!evmAddress && isConnecting && "Connecting..."}
            {evmAddress && !ensName && `${truncateEthAddress(evmAddress)}`}
            {evmAddress && ensName && `${ensName}`}
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default Index;
