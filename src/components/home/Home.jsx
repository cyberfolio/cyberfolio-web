import React, { useEffect, useState } from "react";
import "./Home.scss";

import axios from "axios";
import Web3 from 'web3';
import { useSelector } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";
import { Utilities } from "../utilities/Utilities";
import { Assets } from "../assets/Assets";
import { ChainsDropDown } from "./chains-dropdown/ChainsDropDown";
import { toast } from "react-toastify";

const availableChains = ["Ethereum Wallet", "Solana Wallet", "Polkadot Wallet"];
const availableCexes = ["Binance Account", "FTX Account", "Kucoin Account", "Gateio Account"];

export const Home = () => {
  const evmAddress = useSelector((state) => state.evmAddress);
  const chain = useSelector((state) => state.chain);

  const [chainsDropDownOpen, setChainsDropDownOpen] = useState(false);
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
   if(!window.ethereum) {
     toast.error("Install Metamask to use the app")
   }
  }, []);

  useEffect(() => {
    setChainsDropDownOpen(false);
  }, [chain]);

  useEffect(() => {
    getEthBalance(evmAddress);
  }, [evmAddress]);

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header__add-wallets">
          {availableChains.map((chain) => {
            return (
              <div className="home__header__add-wallets__bundle" key={chain}>
                {chain}
                <Plus color="white" size={20} />
              </div>
            );
          })}
           {availableCexes.map((cex) => {
            return (
              <div className="home__header__add-wallets__bundle" key={cex}>
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
              $10,000,883
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
