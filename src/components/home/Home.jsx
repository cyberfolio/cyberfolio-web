import React, { useEffect, useState } from "react";
import "./Home.scss";

import { useSelector, useDispatch } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";
import classNames from "classnames";

import { Utilities } from "../utilities/Utilities";
import { Assets } from "../assets/Assets";

import { ChainsDropDown } from "./chains-dropdown/ChainsDropDown";
import { ACTIONS } from "../../state/actions";
import useKeypress from "../hooks/useKeyPress";
import { toUsd } from "../../utils";
import InfoService from "../../services/info";

const availableChains = ["Bitcoin", "EVM", "Solana", "Polkadot"];
const availableCexes = ["Binance", "FTX", "Kucoin", "Gateio"];

const activeBundle = "Main";

export const Home = () => {
  const chain = useSelector((state) => state.chain);
  const dispatch = useDispatch();
  const [chainsDropDownOpen, setChainsDropDownOpen] = useState(false);
  const [netWorth, setNetworth] = useState(0);
  const [bundles, setBundles] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);

  useEffect(() => {
    setChainsDropDownOpen(false);
  }, [chain]);

  useEffect(() => {
    const getTotal = async () => {
      const net = await InfoService.getNetWorth();
      setNetworth(net);
    };
    const getAvailableAccounts = async () => {
      const availableAccounts = await InfoService.getAvailableAccounts();
      setAvailableAccounts(availableAccounts);
    };
    setBundles((old) => [...old, "Main"]);
    getTotal();
    getAvailableAccounts();
  }, []);

  useKeypress("Escape", () => {
    setChainsDropDownOpen(false);
  });

  const openWalletModal = (chain) => {
    dispatch({
      type: ACTIONS.OPEN_WALLET_MODAL,
      payload: {
        open: true,
        chain,
      },
    });
  };

  const openAddCexModal = (name) => {
    dispatch({
      type: ACTIONS.OPEN_ADD_CEX_MODAL,
      payload: {
        open: true,
        name,
      },
    });
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
          <div className="home__header__add-wallets__button">
            New Bundle
            <Plus color="white" size={20} />
          </div>
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

Home.whyDidYouRender = true;
