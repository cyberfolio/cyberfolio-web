import React from "react";
import "./Home.scss";

import axios from "axios";
import { useSelector } from "react-redux";
import { Plus } from "react-bootstrap-icons";
import { Utilities } from "../utilities/Utilities";

export const Home = () => {
  const evmAddress = useSelector((state) => state.evmAddress);
  const [ethBalance, setEthBalance] = React.useState("");

  const getEthBalance = async (address) => {
    if (address) {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/ethereum/eth-balance?address=${address}`
        );
        setEthBalance(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  React.useEffect(() => {
    getEthBalance(evmAddress);
  }, [evmAddress]);

  return (
    <div className="home">
      <div className="home__assets">
        <div className="home__assets__add-wallets">
          <div className="home__assets__add-wallets__bundle">
            Ethereum Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__assets__add-wallets__bundle">
            Solana Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__assets__add-wallets__bundle">
            Polkadot Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__assets__add-wallets__bundle">
            Matic Wallet
            <Plus color="white" size={20} />
          </div>
          <div className="home__assets__add-wallets__bundle">
            Binance Account <Plus color="white" size={20} />
          </div>
          <div className="home__assets__add-wallets__bundle">
            FTX Account <Plus color="white" size={20} />
          </div>
        </div>
        <div className="home__assets__total-balance">
        <div className="home__assets__total-balance__label">Net Worth</div>
          <div className="home__assets__total-balance__value">$34,883.04</div>
        </div>
      </div>
      <div className="home__utilities">
        <Utilities />

      </div>
      {/*<div className="home__eth">ETH BALANCE: {ethBalance}</div>*/}
    </div>
  );
};
