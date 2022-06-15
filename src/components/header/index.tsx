import { useEffect } from "react";
import "./index.scss";

import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Metamask from "@assets/metamask.png";
import { truncateEthAddress } from "@utils/index";
import { useMetamaskLogin } from "@components/hooks/useMetamaskLogin";
import InfoService from "@services/info";
import { useAppDispatch, useAppSelector } from "@store/functions";

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
  const evmAddress = useAppSelector((state) => state.evmAddress);
  const ensName = useAppSelector((state) => state.ensName);
  const dispatch = useAppDispatch();

  const { isConnecting, signAndVerifyMessage, disconnectMetamask } =
    useMetamaskLogin();

  const resolveEnsName = async () => {
    if (evmAddress && !ensName) {
      try {
        const name = await InfoService.getEnsName();
        dispatch({
          type: "SET_ENS_NAME",
          payload: {
            data: name,
          },
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    resolveEnsName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evmAddress, ensName]);

  const renderTooltip = () => {
    if (evmAddress)
      return (
        <Tooltip id="button-tooltip">
          <div className="metamask-tooltip">Click to disconnect</div>
        </Tooltip>
      );
    return (
      <Tooltip id="button-tooltip">
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
