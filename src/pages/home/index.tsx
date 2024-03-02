import "./index.scss";

import { Plus, ChevronDown } from "react-bootstrap-icons";
import classNames from "classnames";

import Utilities from "./utilities";
import Assets from "./assets";

import PlatformDropdown from "@components/platform-dropdown";
import utils from "@utils/index";
import { Cex, Chain } from "@app-types/index";
import useHome from "./useIndex";

const availableChains = [Chain.BITCOIN, Chain.ETHEREUM, Chain.SOLANA];
const availableCexes = [Cex.BINANCE, Cex.BINANCETR, Cex.KUCOIN, Cex.GATEIO];

const Home = () => {
  const {
    evmAddress,
    connectedCexes,
    connectedWallets,
    netWorth,
    platform,
    platformDropdownOpen,
    hoveredWallet,
    setHoveredWallet,
    lastUpdate,
    platfromDropdownRef,
    openWalletModal,
    openAddCexModal,
    addMore,
    setPlatformDropdownOpen,
    onAddStockClick,
  } = useHome();

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
                  <span className="connectedDotButton"></span>
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
                  <span className="connectedDotButton"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}
              </div>
            );
          })}
          <div className={classNames("home__header__add__wallet")} onClick={() => onAddStockClick()}>
            Add a Stock <Plus color="white" size={20} />
          </div>
        </div>

        <div className="home__header__second">
          {evmAddress && (
            <>
              <div className="home__header__second__first">
                <div className="home__header__second__first__total-balance">
                  <div className="home__header__second__first__total-balance__label">Net Worth</div>
                  <div className="home__header__second__first__total-balance__value">{utils.toUsd(netWorth)}</div>
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
                <div
                  className="home__header__second__filter__button"
                  onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                  ref={platfromDropdownRef}
                >
                  <img
                    className="home__header__second__filter__button__icon"
                    src={platform.image}
                    alt={platform.name}
                    height={25}
                  />
                  {platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
                  <div className="home__header__second__filter__button__arrow">
                    <ChevronDown color="white" size={15} />
                  </div>
                </div>
                <PlatformDropdown open={platformDropdownOpen} />
              </div>
            </>
          )}
        </div>

        <div className="home__assets">
          <Assets />
        </div>
      </div>
      <div className="home__utilities">
        <Utilities />
      </div>
    </div>
  );
};

export default Home;
