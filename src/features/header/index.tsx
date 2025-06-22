import React, { useEffect } from "react";
import "./index.scss";

import AppUtils from "utils/index";
import AppHooks from "hooks/index";
import InfoService from "services/info";
import AppComponents from "components/index";
import { useChainId, useConnect } from "wagmi";
import AppAssets from "assets/index";

const Header = () => {
  const isAuthenticated = AppHooks.useAppSelector((state) => state.evmAddress);

  return (
    <div className="header">
      <div className="header__content">
        <div className="header__content__brand">
          <img src={AppAssets.Icons.Logo} className="header__content__brand__image" />
          <div className="header__content__brand__label">Cyberfolio</div>
        </div>
        <div className="header__content__brand">
          {isAuthenticated && (
            <a
              href={AppAssets.Icons.BuyMeACoffee}
              target="_blank"
              rel="noreferrer"
              className="header__content__brand__bmc"
            >
              <img src={AppAssets.Icons.BuyMeACoffee} className="header__content__brand__bmc__logo" />
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
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false);
  const evmAddress = AppHooks.useAppSelector((state) => state.evmAddress);
  const ensName = AppHooks.useAppSelector((state) => state.ensName);
  const dispatch = AppHooks.useAppDispatch();
  const { connectors, connect } = useConnect();
  const chainId = useChainId();

  const { isConnecting, signAndVerifyMessageV2, disconnectMetamask } = AppHooks.useLogin();

  const handleConnectWallet = async () => {
    setIsWalletModalOpen(true);
  };

  useEffect(() => {
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
    resolveEnsName();
  }, [dispatch, ensName, evmAddress]);

  return (
    <div className="metamask">
      <AppComponents.Modal
        open={isWalletModalOpen}
        title="Select wallet"
        content={
          <div className="wallet-modal-content">
            {connectors.map((connector) => {
              return (
                <AppComponents.Button
                  key={connector.uid}
                  text={connector.name}
                  onClick={() => connect({ connector, chainId })}
                />
              );
            })}
          </div>
        }
        action={signAndVerifyMessageV2}
        close={() => setIsWalletModalOpen(false)}
        loading={isConnecting}
      />
      <div
        className={`metamask-button ${isConnecting ? "disabled-button" : ""}`}
        onClick={!evmAddress ? signAndVerifyMessageV2 : disconnectMetamask}
      >
        <img className="metamask-button-img" src={AppAssets.Icons.Ethereum} alt="metamask" />
        {evmAddress ? <span className="connected-Dot"></span> : <></>}
        <div className="metamask-button-text">
          {!evmAddress && !isConnecting && "Connect Wallet"}
          {!evmAddress && isConnecting && "Connecting..."}
          {evmAddress && !ensName && `${AppUtils.truncateEthAddress(evmAddress)}`}
          {evmAddress && ensName && `${ensName}`}
        </div>
      </div>
    </div>
  );
};

export default Header;
