import React, { useEffect, useState, useRef } from "react";
import "./Home.scss";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Plus, ChevronDown } from "react-bootstrap-icons";
import { Utilities } from "../utilities/Utilities";
import { Assets } from "../assets/Assets";
import { ACTIONS } from "../../state/actions";
import { ChainsDropDown } from "./chains-dropdown/ChainsDropDown";

export const Home = () => {
  const evmAddress = useSelector((state) => state.evmAddress);
  const dispatch = useDispatch();
  const [chainsDropDownOpen, setChainsDropDownOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(false);
  const filterButtonRef = useRef()


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
    const checkIfClickedOutside = e => {
      if (chainsDropDownOpen && filterButtonRef.current && !filterButtonRef.current.contains(e.target)) {
        setChainsDropDownOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [chainsDropDownOpen])

  useEffect(() => {
    dispatch({
      type: ACTIONS.FILTER_ASSETS_BY_CHAIN,
      payload: {
        data: selectedChain,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChain]);

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
            <div
              className="home__header__second__filter__button"
              onClick={() => setChainsDropDownOpen(!chainsDropDownOpen)}
              ref={filterButtonRef}
            >
              All Networks
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
