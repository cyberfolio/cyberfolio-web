import React from "react";
import "./ChainsDropDown.scss";

import { ACTIONS } from "../../../state/actions";
import { useDispatch } from "react-redux";

export const ChainsDropDown = () => {
  const dispatch = useDispatch();
  const chains = [
    {
      name: "All Networks",
      image: "http://localhost:3000/blockchain.svg",
    },
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
      image: "http://localhost:3000/solana.svg",
    },
    {
      name: "Polkadot",
      image: "http://localhost:3000/polkadot.svg",
    },
    {
      name: "Polygon",
      image: "http://localhost:3000/polygon.svg",
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

  const setChain = (chain, image) => {
    dispatch({
      type: ACTIONS.FILTER_ASSETS_BY_CHAIN,
      payload: {
        data: {
          name: chain,
          image,
        },
      },
    });
  };

  return (
    <div className="chains-dropdown">
      {chains.map(({ name, image }) => {
        return (
          <div
            key={name}
            className="chains-dropdown__item"
            onClick={() => setChain(name, image)}
          >
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
