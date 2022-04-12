import React, { useEffect, useState } from "react";
import "./Home.scss";

import { useSelector, useDispatch } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";

import { Utilities } from "../utilities/Utilities";
import { Assets } from "../assets/Assets";

import { ChainsDropDown } from "./chains-dropdown/ChainsDropDown";
import { ACTIONS } from "../../state/actions";
import useKeypress from "../hooks/useKeyPress";
import { toUsd } from "../../utils";

const availableChains = ["Bitcoin", "Evm", "Solana", "Polkadot"];
const availableCexes = [
  "Binance Account",
  "FTX Account",
  "Kucoin Account",
  "Gateio Account",
];

export const Home = () => {
  const chain = useSelector((state) => state.chain);
  const netWorth = useSelector((state) => state.netWorth);
  const dispatch = useDispatch();
  const [chainsDropDownOpen, setChainsDropDownOpen] = useState(false);

  useEffect(() => {
    setChainsDropDownOpen(false);
  }, [chain]);

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
        <div className="home__header__add-wallets">
          {availableChains.map((chain) => {
            return (
              <div
                className="home__header__add-wallets__bundle"
                key={chain}
                onClick={() => openWalletModal(chain)}
              >
                {chain} Wallet
                <Plus color="white" size={20} />
              </div>
            );
          })}
          {availableCexes.map((cex) => {
            return (
              <div
                className="home__header__add-wallets__bundle"
                key={cex}
                onClick={() => openAddCexModal(cex)}
              >
                {cex}
                <Plus color="white" size={20} />
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
