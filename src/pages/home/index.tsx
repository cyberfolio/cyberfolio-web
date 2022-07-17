import { useEffect, useState, useCallback } from "react";
import "./index.scss";

import { Plus, ChevronDown } from "react-bootstrap-icons";
import classNames from "classnames";
import { toast } from "react-hot-toast";

import Utilities from "@components/utilities";
import Assets from "@components//assets";

import FilterDropdown from "@components/platform-dropdown";
import useKeypress from "@components/hooks/useKeyPress";
import utils from "@utils/index";
import InfoService from "@services/info";
import { useAppDispatch, useAppSelector } from "@store/functions";
import { Cex, Chain } from "@customTypes/index";

const availableChains = [Chain.BITCOIN, Chain.ETHEREUM, Chain.SOLANA];
const availableCexes = [Cex.BINANCE, Cex.FTX, Cex.KUCOIN, Cex.GATEIO];

const Home = () => {
  const platform = useAppSelector((state) => state.platform);
  const netWorth = useAppSelector((state) => state.netWorth);
  const lastAssetUpdate = useAppSelector((state) => state.lastAssetUpdate);
  const evmAddress = useAppSelector((state) => state.evmAddress);
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);

  const dispatch = useAppDispatch();
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const getTotal = useCallback(async () => {
    try {
      const netWorth = await InfoService.getNetWorth();
      dispatch({
        type: "SET_NET_WORTH",
        payload: {
          data: netWorth,
        },
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);
  const getAvailableAccounts = useCallback(async () => {
    try {
      const availableAccounts = await InfoService.getConnectedAccounts();
      dispatch({
        type: "SET_CONNECTED_CEXES",
        payload: {
          data: availableAccounts.cexes,
        },
      });
      dispatch({
        type: "SET_CONNECTED_WALLETS",
        payload: {
          data: availableAccounts.wallets,
        },
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);

  const onFocus = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    setFilterDropdownOpen(false);
  }, [platform]);

  useEffect(() => {
    if (evmAddress) {
      getTotal();
      getAvailableAccounts();
    }
  }, [evmAddress, getTotal, getAvailableAccounts]);

  useKeypress("Escape", () => {
    setFilterDropdownOpen(false);
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
    if (connectedCexes.includes(name)) return;
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

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header__add-wallets">
          {availableChains.map((chain) => {
            return (
              <div
                className={classNames(
                  "home__header__add-wallets__button ",
                  connectedWallets.some((wallet) => wallet.chain === chain) &&
                    "home__header__add-wallets__button--active",
                )}
                key={chain}
                onClick={() => openWalletModal(chain)}
              >
                {chain} {connectedWallets.some((wallet) => wallet.chain === chain) ? "Connected" : "Wallet"}
                {connectedWallets.some((wallet) => wallet.chain === chain) ? (
                  <span className="connectedDotButton"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}{" "}
              </div>
            );
          })}
          {availableCexes.map((cex) => {
            return (
              <div
                className={classNames(
                  "home__header__add-wallets__button ",
                  connectedCexes.includes(cex) && "home__header__add-wallets__button--active",
                )}
                key={cex}
                onClick={() => openAddCexModal(cex)}
              >
                {cex} {connectedCexes.includes(cex) ? "Connected" : "Account"}
                {connectedCexes.includes(cex) ? (
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
                  {lastAssetUpdate && (
                    <div className="home__header__second__first__last-update__label">
                      Data updated{" "}
                      <span className="home__header__second__first__last-update__label--value">
                        {utils.toReadableDateDifference(new Date(lastAssetUpdate), currentTime)}
                      </span>{" "}
                      ago
                    </div>
                  )}
                </div>
              </div>

              <div className="home__header__second__filter">
                <div
                  className="home__header__second__filter__button"
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
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
                {filterDropdownOpen && <FilterDropdown />}
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
