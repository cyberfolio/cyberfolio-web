import React from "react";
import "./index.scss";

import { Plus } from "react-bootstrap-icons";
import classNames from "classnames";

import AppComponents from "components/index";
import AppHooks from "hooks/index";
import AppUtils from "utils/index";
import AppAssets from "assets/index";
import AppStructures from "structures/index";

import useHome from "./useHome";
import Assets from "./components/assets";
import toast from "react-hot-toast";
import AddCexModal from "./components/add-cex-modal";
import AddWalletModal from "./components/add-wallet-modal";

const availableChains = [AppStructures.Chain.BITCOIN, AppStructures.Chain.ETHEREUM, AppStructures.Chain.SOLANA];
const availableCexes = [
  AppStructures.Cex.BINANCE,
  AppStructures.Cex.BINANCETR,
  AppStructures.Cex.KUCOIN,
  AppStructures.Cex.GATEIO,
];

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
    addMore,
    setIsPlatformDropdownOpen,
    onPlatformClick,
  } = useHome();

  const [isCexModalOpen, setIsCexModalOpen] = React.useState({
    open: false,
    name: AppStructures.Cex.BINANCE,
  });
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState({
    open: false,
    name: AppStructures.Chain.BITCOIN,
  });

  const openAddCexModal = (name: AppStructures.Cex) => {
    const isConnected = Boolean(evmAddress) === true;
    if (!isConnected || !evmAddress) {
      toast.error("Connect your wallet");
      return;
    }
    if (connectedCexes.some((connectedCex) => connectedCex.name === name)) return;

    setIsCexModalOpen({
      open: true,
      name,
    });
  };

  const openWalletModal = (chain: AppStructures.Chain) => {
    const isConnected = Boolean(evmAddress) === true;
    if (!isConnected || !evmAddress) {
      toast.error("Connect your wallet");
      return;
    }
    if (connectedWallets.some((wallet) => wallet.chain === chain)) return;
    setIsWalletModalOpen({
      open: true,
      name: chain,
    });
  };

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

  const onCloseCexModal = () => {
    setIsCexModalOpen({
      open: false,
      name: AppStructures.Cex.BINANCE,
    });
  };

  const onCloseWalletModal = () => {
    setIsWalletModalOpen({
      open: false,
      name: AppStructures.Chain.BITCOIN,
    });
  };

  return (
    <div className={classNames("home", !evmAddress && "home--not-connected")}>
      <AddCexModal name={isCexModalOpen.name} isOpen={isCexModalOpen.open} onClose={onCloseCexModal} />
      <AddWalletModal chain={isWalletModalOpen.name} isOpen={isWalletModalOpen.open} onClose={onCloseWalletModal} />
      <div className="home__header">
        <div className="home__header__add">
          {availableChains.map((chain) => {
            return (
              <AppComponents.Button
                key={chain}
                onClick={() => openWalletModal(chain)}
                onMouseEnter={() => addMore(chain)}
                onMouseLeave={() => setHoveredWallet(undefined)}
                text={`${chain} ${connectedWallets.some((wallet) => wallet.chain === chain) ? "Connected" : "Wallet"}`}
                icon={
                  connectedWallets.some((wallet) => wallet.chain === chain) ? (
                    <span className="connected-dot-button"></span>
                  ) : (
                    <Plus color="white" size={20} />
                  )
                }
              />
            );
          })}
          {availableCexes.map((cex) => {
            return (
              <AppComponents.Button
                key={cex}
                text={`${cex} ${connectedCexes.some((connectedCex) => connectedCex.name === cex) ? "Connected" : "Account"}`}
                onClick={() => openAddCexModal(cex)}
                icon={
                  connectedCexes.some((connectedCex) => connectedCex.name === cex) ? (
                    <span className="connected-dot-button"></span>
                  ) : (
                    <Plus color="white" size={20} />
                  )
                }
              />
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
