import { useEffect } from "react";
import "./index.scss";

import BuyMeACoffee from "assets/src/bmc-logo.png";
import Logo from "assets/src/logo.png";
import utils from "utils/index";
import AppHooks from "hooks/index";
import InfoService from "services/info";
import { useAppDispatch, useAppSelector } from "store/functions";
import AppConstants from "constants/index";
import AppAssets from "assets";

const Header = () => {
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
            <a
              href={AppConstants.BuyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="header__content__brand__bmc"
            >
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

  const { isConnecting, signAndVerifyMessageV2, disconnectMetamask } = AppHooks.useMetamaskLogin();

  const resolveEnsName = async () => {
    if (evmAddress && !ensName) {
      try {
        const name = await InfoService.getEnsName();
        dispatch({
          type: "SET_ENS_NAME",
          payload: name,
        });
      } catch (e) {
        dispatch({
          type: "SET_ENS_NAME",
          payload: "",
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
        onClick={!evmAddress ? signAndVerifyMessageV2 : disconnectMetamask}
      >
        <img className="metamask-button-img" src={AppAssets.Ethereum} alt="metamask" />
        {evmAddress ? <span className="connectedDot"></span> : <></>}
        <div className="metamask-button-text">
          {!evmAddress && !isConnecting && "Connect Wallet"}
          {!evmAddress && isConnecting && "Connecting..."}
          {evmAddress && !ensName && `${utils.truncateEthAddress(evmAddress)}`}
          {evmAddress && ensName && `${ensName}`}
        </div>
      </div>
    </div>
  );
};

export default Header;
