import React, { useEffect, useState } from "react";
import "./index.scss";

import { useSelector, useDispatch } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";
import classNames from "classnames";
import toast from "react-hot-toast";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Utilities from "../utilities";
import Assets from "../assets";

import { ChainsDropDown } from "./chains-dropdown/ChainsDropDown";
import Actions from "../../store/actions";
import useKeypress from "../../hooks/useKeyPress";
import { toUsd } from "../../utils";
import InfoService from "../../services/info";

const availableChains = ["Bitcoin", "EVM", "Solana", "Polkadot"];
const availableCexes = ["Binance", "FTX", "Kucoin", "Gateio"];

const activeBundle = "Main";

const Home = () => {
  const chain = useSelector((state) => state.chain);
  const netWorth = useSelector((state) => state.netWorth);
  const evmAddress = useSelector((state) => state.evmAddress);

  const dispatch = useDispatch();
  const [chainsDropDownOpen, setChainsDropDownOpen] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);

  const getTotal = async () => {
    try {
      const netWorth = await InfoService.getNetWorth();
      dispatch({
        type: Actions.SET_NET_WORTH,
        payload: {
          data: netWorth,
        },
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  };
  const getAvailableAccounts = async () => {
    try {
      const availableAccounts = await InfoService.getAvailableAccounts();
      setAvailableAccounts(availableAccounts);
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    setChainsDropDownOpen(false);
  }, [chain]);

  useEffect(() => {
    setBundles(["Main"]);
    getTotal();
    getAvailableAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeypress("Escape", () => {
    setChainsDropDownOpen(false);
  });

  const openWalletModal = (chain) => {
    if (evmAddress) {
      dispatch({
        type: Actions.OPEN_WALLET_MODAL,
        payload: {
          open: true,
          chain,
        },
      });
    }
  };

  const openAddCexModal = (name) => {
    if (evmAddress) {
      dispatch({
        type: Actions.OPEN_ADD_CEX_MODAL,
        payload: {
          open: true,
          name,
        },
      });
    }
  };

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Coming soon
      </Tooltip>
    );
  };

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header__bundle">
          {bundles.map((bundle) => {
            return (
              <div
                className={classNames(
                  "home__header__bundle__available",
                  bundle === activeBundle &&
                    "home__header__bundle__available--active"
                )}
                key={bundle}
              >
                {bundle} Bundle
              </div>
            );
          })}
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 50, hide: 100 }}
            overlay={renderTooltip}
          >
            <div className="home__header__add-wallets__button">
              New Bundle
              <Plus color="white" size={20} />
            </div>
          </OverlayTrigger>
        </div>
        <div className="home__header__add-wallets">
          {availableChains.map((chain) => {
            return (
              <div
                className={classNames(
                  "home__header__add-wallets__button ",
                  availableAccounts.includes(chain.toLowerCase()) &&
                    "home__header__add-wallets__button--active"
                )}
                key={chain}
                onClick={() => openWalletModal(chain)}
              >
                {chain}{" "}
                {availableAccounts.includes(chain.toLowerCase())
                  ? "Connected"
                  : "Wallet"}
                {availableAccounts.includes(chain.toLowerCase()) ? (
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
                  availableAccounts.includes(cex.toLowerCase()) &&
                    "home__header__add-wallets__button--active"
                )}
                key={cex}
                onClick={() => openAddCexModal(cex)}
              >
                {cex}{" "}
                {availableAccounts.includes(cex.toLowerCase())
                  ? "Connected"
                  : "Account"}
                {availableAccounts.includes(cex.toLowerCase()) ? (
                  <span className="connectedDotButton"></span>
                ) : (
                  <Plus color="white" size={20} />
                )}
              </div>
            );
          })}
        </div>
        <div className="home__header__second">
          <div className="home__header__second__total-balance">
            <div className="home__header__second__total-balance__label">
              Net Worth
            </div>
            <div className="home__header__second__total-balance__value">
              {toUsd(netWorth)}
            </div>
          </div>
          <div className="home__header__second__filter">
            <div
              className="home__header__second__filter__button"
              onClick={() => setChainsDropDownOpen(!chainsDropDownOpen)}
            >
              <img
                className="home__header__second__filter__button__icon"
                src={chain.image}
                alt={chain.name}
                height={25}
              />
              {chain.name}
              <div className="home__header__second__filter__button__arrow">
                <ChevronDown color="white" size={15} />
              </div>
            </div>
            {chainsDropDownOpen && <ChainsDropDown />}
          </div>
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
