import React from "react";
import "./index.module.scss";

import { Plus } from "react-bootstrap-icons";
import classNames from "classnames";

import AppComponents from "components";
import AppHooks from "hooks";
import AppUtils from "utils";
import AppAssets from "assets";
import { Cex, Chain } from "structures/index";

import useHome from "./useHome";
import Assets from "./assets";

const availableChains = [Chain.BITCOIN, Chain.ETHEREUM, Chain.SOLANA];
const availableCexes = [Cex.BINANCE, Cex.BINANCETR, Cex.KUCOIN, Cex.GATEIO];

const Home = () => {
  const {
    evmAddress,
    connectedCexes,
    connectedWallets,
    netWorth,
    isPlatformDropdownOpen,
    // hoveredWallet,
    setHoveredWallet,
    lastUpdate,
    openWalletModal,
    openAddCexModal,
    addMore,
    setIsPlatformDropdownOpen,
    onPlatformClick,
  } = useHome();

  const [homeAssetsHeight, setHomeAssetsHeight] = React.useState(0);

  const platform = AppHooks.useAppSelector((state) => state.platform);
  const chains = AppUtils.chainInfo.map(({ name, image }) => {
    return {
      name,
      image,
    };
  });
  const cexes = AppUtils.cexInfo.map(({ name, image }) => {
    return {
      name,
      image,
    };
  });

  React.useEffect(() => {
    const onResize = () => {
      const homeHeaderHeight = document.getElementsByClassName("home__header")[0]?.clientHeight ?? 0;
      const headerHeight = document.getElementsByClassName("header")[0]?.clientHeight ?? 0;
      const footerHeight = document.getElementsByClassName("footer")[0]?.clientHeight ?? 0;
      const homeAssetsHeight = window.innerHeight - (homeHeaderHeight + headerHeight + footerHeight + 50);
      setHomeAssetsHeight(homeAssetsHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={classNames("home", !evmAddress && "home--not-connected")}>
      <div className="home__header">
        <div className="home__header__add">
          {availableChains.map((chain) => {
            return (
              <div
                className={classNames(
                  "home__header__add__wallet",
                  connectedWallets.some((wallet) => wallet.chain === chain) && "home__header__add__wallet--active",
                )}
                key={chain}
                onClick={() => openWalletModal(chain)}
                onMouseEnter={() => addMore(chain)}
                onMouseLeave={() => setHoveredWallet(undefined)}
              >
                {chain} {connectedWallets.some((wallet) => wallet.chain === chain) ? "Connected" : "Wallet"}
                {connectedWallets.some((wallet) => wallet.chain === chain) ? (
                  <span className="connected-dot-button"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}
                <span className="home__header__add__wallet--active__tooltip">Add another {chain} wallet</span>
              </div>
            );
          })}
          {availableCexes.map((cex) => {
            return (
              <div
                className={classNames(
                  "home__header__add__cex",
                  connectedCexes.some((connectedCex) => connectedCex.name === cex) && "home__header__add__cex--active",
                )}
                key={cex}
                onClick={() => openAddCexModal(cex)}
              >
                {cex} {connectedCexes.some((connectedCex) => connectedCex.name === cex) ? "Connected" : "Account"}
                {connectedCexes.some((connectedCex) => connectedCex.name === cex) ? (
                  <span className="connected-dot-button"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}
              </div>
            );
          })}
        </div>

        <div className="home__header__second">
          {evmAddress && (
            <>
              <div className="home__header__second__first">
                <div className="home__header__second__first__total-balance">
                  <div className="home__header__second__first__total-balance__label">Net Worth</div>
                  <div className="home__header__second__first__total-balance__value">{AppUtils.toUsd(netWorth)}</div>
                </div>

                <div className="home__header__second__first__last-update">
                  {lastUpdate && (
                    <div className="home__header__second__first__last-update__label">
                      Data updated{" "}
                      <span className="home__header__second__first__last-update__label--value">{lastUpdate}</span> ago
                    </div>
                  )}
                </div>
              </div>

              <div className="home__header__second__filter">
                <AppComponents.Dropdown
                  isOpen={isPlatformDropdownOpen}
                  setIsOpen={setIsPlatformDropdownOpen}
                  items={[...chains, ...cexes, { name: "All Networks", image: AppAssets.Icons.BlockChain }]}
                  onClick={onPlatformClick}
                  selectedItem={platform}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="home__assets" style={{ minHeight: homeAssetsHeight }}>
        <Assets />
      </div>
    </div>
  );
};

export default Home;
