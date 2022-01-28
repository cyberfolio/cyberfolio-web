import React from "react";
import "./ChainsDropDown.scss";

import SolanaLogo from "../../../assets/solana.svg";

const chains = [
  {
    name: "Ethereum",
    image: "https://chain-icons.s3.amazonaws.com/ethereum.png",
  },
  {
    name: "Avalanche",
    image: "https://chain-icons.s3.amazonaws.com/avalanche.png",
  },
  {
    name: "Solana",
    image: SolanaLogo,
  },
  {
    name: "BSC",
    image: "https://chain-icons.s3.amazonaws.com/bsc.png",
  },
  {
    name: "Arbitrum",
    image: "https://chain-icons.s3.amazonaws.com/arbitrum.png",
  },
  {
    name: "Optimism",
    image: "https://chain-icons.s3.amazonaws.com/optimism.png",
  },
];

export const ChainsDropDown = () => {
  return (
    <div className="chains-dropdown">
      {chains.map(({ name, image }) => {
        return (
          <div className="chains-dropdown__item">
            <img
              className="chains-dropdown__item__image"
              src={image}
              alt={name}
            />
            <div className="chains-dropdown__item__name"> {name} </div>
          </div>
        );
      })}
    </div>
  );
};
