import { useEffect } from "react";
import "./index.scss";

import Metamask from "@assets/metamask.png";
import BuyMeACoffee from "@assets/bmc-logo.png";
import Logo from "@assets/logo.png";
import utils from "@utils/index";
import { useMetamaskLogin } from "@components/hooks/useMetamaskLogin";
import InfoService from "@services/info";
import { useAppDispatch, useAppSelector } from "@store/functions";
import links from "@config/links";

const Index = () => {
  const isAuthenticated = useAppSelector((state) => state.evmAddress);

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__content__brand">
          <img src={Logo} className="header__content__brand__image" />
          <div className="header__content__brand__label">Cyberfolio</div>
        </div>
        <div className="header__content__brand">
          {isAuthenticated && (
            <a href={links.buyMeACoffee} target="_blank" rel="noreferrer" className="header__content__brand__bmc">
              <img src={BuyMeACoffee} className="header__content__brand__bmc__logo" />
              <div className="header__content__brand__bmc__text">Buy me a coffee</div>
            </a>
          )}
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

const ConnectWallet = () => {
  const evmAddress = useAppSelector((state) => state.evmAddress);
  const ensName = useAppSelector((state) => state.ensName);
  const dispatch = useAppDispatch();

  const { isConnecting, signAndVerifyMessage, disconnectMetamask } = useMetamaskLogin();

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
        dispatch({
          type: "SET_ENS_NAME",
          payload: {
            data: "",
          },
        });
      }
    }
  };

  useEffect(() => {
    resolveEnsName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evmAddress, ensName]);

  return (
    <div className="metamask">
      <div
        className={`metamask-button ${isConnecting ? "disabledbutton" : ""}`}
        onClick={!evmAddress ? signAndVerifyMessage : disconnectMetamask}
      >
        <img className="metamask-button-img" src={Metamask} alt="metamask" />
        {evmAddress ? <span className="connectedDot"></span> : <></>}
        <div className="metamask-button-text">
          {!evmAddress && !isConnecting && "Connect Metamask"}
          {!evmAddress && isConnecting && "Connecting..."}
          {evmAddress && !ensName && `${utils.truncateEthAddress(evmAddress)}`}
          {evmAddress && ensName && `${ensName}`}
        </div>
      </div>
    </div>
  );
};

export default Index;
