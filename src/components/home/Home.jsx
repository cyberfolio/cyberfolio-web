import React from "react";
import "./Home.css";

import axios from "axios";
import { useSelector } from "react-redux";

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
      <div className="home-eth">ETH BALANCE: {ethBalance}</div>
    </div>
  );
};
