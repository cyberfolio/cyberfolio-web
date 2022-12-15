import { useEffect, useState, useCallback, useRef } from "react";
import "./index.scss";

import { Plus, ChevronDown } from "react-bootstrap-icons";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import Utilities from "@components/utilities";
import Assets from "@components//assets";

import PlatformDropdown from "@components/platform-dropdown";
import useKeypress from "@hooks/useKeyPress";
import utils from "@utils/index";
import InfoService from "@services/info";
import { useAppDispatch, useAppSelector } from "@store/functions";
import { Cex, Chain, Keys } from "@customTypes/index";
import useOnClickOutside from "@hooks/useClickOutside";

const availableChains = [Chain.BITCOIN, Chain.ETHEREUM, Chain.SOLANA];
const availableCexes = [Cex.BINANCE, Cex.BINANCETR, Cex.KUCOIN, Cex.GATEIO];

const Home = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const netWorth = useAppSelector((state) => state.netWorth);
  const lastAssetUpdate = useAppSelector((state) => state.lastAssetUpdate);
  const evmAddress = useAppSelector((state) => state.evmAddress);
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);

  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredWallet, setHoveredWallet] = useState<Chain | undefined>();
  const [lastUpdate, setLastUpdate] = useState<string>();
  const platfromDropdownRef = useRef<HTMLDivElement>(null);

  const getTotal = useCallback(async () => {
    try {
      const netWorth = await InfoService.getNetWorth();
      dispatch({
        type: "SET_NET_WORTH",
        payload: netWorth,
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);
  const getAvailableAccounts = useCallback(async () => {
    try {
      const { cexes, wallets } = await InfoService.getConnectedAccounts();
      dispatch({
        type: "SET_CONNECTED_CEXES",
        payload: cexes,
      });
      dispatch({
        type: "SET_CONNECTED_WALLETS",
        payload: wallets,
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    setPlatformDropdownOpen(false);
  }, [platform]);

  useEffect(() => {
    if (evmAddress) {
      getTotal();
      getAvailableAccounts();
    }
  }, [evmAddress, getTotal, getAvailableAccounts]);

  useEffect(() => {
    const updateLastUpdateTime = () => {
      const lastUpdateRes = utils.toReadableDateDifference(new Date(lastAssetUpdate), new Date());
      setLastUpdate(lastUpdateRes);
    };
    updateLastUpdateTime();
    const interval = setInterval(() => {
      updateLastUpdateTime();
    }, 58000);
    return () => {
      clearInterval(interval);
    };
  }, [lastAssetUpdate]);

  useKeypress(Keys.Escape, () => {
    setPlatformDropdownOpen(false);
  });
  useOnClickOutside(platfromDropdownRef, () => {
    setPlatformDropdownOpen(false);
  });

  const openWalletModal = (chain: Chain) => {
    if (evmAddress) {
      dispatch({
        type: "OPEN_WALLET_MODAL",
        payload: {
          open: true,
          chain,
        },
      });
    } else {
      toast.error("Wallet not connected yet");
    }
  };

  const openAddCexModal = (name: Cex) => {
    if (connectedCexes.some((connectedCex) => connectedCex.name === name)) return;
    if (evmAddress) {
      dispatch({
        type: "OPEN_ADD_CEX_MODAL",
        payload: {
          open: true,
          name,
        },
      });
    } else {
      toast.error("Wallet not connected yet");
    }
  };

  const addMore = (chain: Chain) => {
    if (connectedWallets.some((wallet) => wallet.chain === chain)) {
      setHoveredWallet(chain);
    }
  };

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
