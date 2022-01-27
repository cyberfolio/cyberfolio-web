import React, { useEffect } from "react";
import "./Home.scss";

import axios from "axios";
import { useSelector } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";
import { Utilities } from "../utilities/Utilities";
import { Assets } from "../assets/Assets";

export const Home = () => {
  const evmAddress = useSelector((state) => state.evmAddress);

  // Example api endpoint to get eth balance
  const getEthBalance = async (address) => {
    if (address) {
      try {
       await axios.get(
          `http://localhost:5000/api/ethereum/eth-balance?address=${address}`
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getEthBalance(evmAddress);
  }, [evmAddress]);

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header__add-wallets">
          <div className="home__header__add-wallets__bundle">
            Ethereum Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__header__add-wallets__bundle">
            Solana Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__header__add-wallets__bundle">
            Polkadot Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__header__add-wallets__bundle">
            Matic Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__header__add-wallets__bundle">
            Binance Account <Plus color="white" size={20} />
          </div>
          <div className="home__header__add-wallets__bundle">
            FTX Account <Plus color="white" size={20} />
          </div>
        </div>
        <div className="home__header__second">
          <div className="home__header__second__total-balance">
            <div className="home__header__second__total-balance__label">
              Net Worth
            </div>
            <div className="home__header__second__total-balance__value">
              $10,000,883
            </div>
          </div>
          <div className="home__header__second__filter">
            <div className="home__header__second__filter__button">
              All Networks
              <div className="home__header__second__filter__button__arrow">
                <ChevronDown color="white" size={15} />
              </div>
            </div>
          </div>
        </div>
        <div className="home__assets">
          <Assets />
        </div>
      </div>
      <div className="home__utilities">
        <Utilities />
      </div>
      {/*<div className="home__eth">ETH BALANCE: {ethBalance}</div>*/}
    </div>
  );
};
