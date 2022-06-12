import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

import AllNetworks from "../assets/blockchain.svg";
import Bitcoin from "../assets/bitcoin.svg";
import Ethereum from "../assets/ethereum.svg";
import SmartChain from "../assets/smartchain.svg";
import Avalanche from "../assets/avalanche.svg";
import Solana from "../assets/solana.svg";
import Polkadot from "../assets/polkadot.svg";
import Polygon from "../assets/polygon.svg";
import Arbitrum from "../assets/arbitrum.svg";
import Optimism from "../assets/optimism.svg";
import Binance from "../assets/binance.svg";
import Kucoin from "../assets/kucoin.png";
import Gateio from "../assets/gateio.svg";
import FTX from "../assets/ftx.svg";

import store from "../store";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const logos = {
  allnetworks: AllNetworks,
  bitcoin: Bitcoin,
  ethereum: Ethereum,
  smartchain: SmartChain,
  avalanche: Avalanche,
  solana: Solana,
  polkadot: Polkadot,
  polygon: Polygon,
  arbitrum: Arbitrum,
  optimism: Optimism,
  binance: Binance,
  kucoin: Kucoin,
  gateio: Gateio,
  ftx: FTX,
};

export const truncateEthAddress = (address: string) => {
  const match = String(address).match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const platformInfo = [
  {
    name: "All Networks",
    image: AllNetworks,
  },
  {
    name: "Bitcoin",
    image: Bitcoin,
  },
  {
    name: "Ethereum",
    image: Ethereum,
  },
  {
    name: "SmartChain",
    image: SmartChain,
  },
  {
    name: "Avalanche",
    image: Avalanche,
  },
  {
    name: "Solana",
    image: Solana,
  },
  {
    name: "Polkadot",
    image: Polkadot,
  },
  {
    name: "Polygon",
    image: Polygon,
  },
  {
    name: "Arbitrum",
    image: Arbitrum,
  },
  {
    name: "Optimism",
    image: Optimism,
  },
  {
    name: "Binance",
    image: Binance,
  },
  {
    name: "Kucoin",
    image: Kucoin,
  },
  {
    name: "Gateio",
    image: Gateio,
  },
  {
    name: "FTX",
    image: FTX,
  },
];

const validateBtcAddress = (address: string) => {
  const re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    return false;
  }
  return true;
};

export const isValidWalletAddress = async ({
  address,
  chain,
}: {
  address: string;
  chain: string;
}) => {
  let isValid = false;
  if (chain) {
    if (chain === "Bitcoin") {
      isValid = validateBtcAddress(address);
    }
    if (chain === "Evm") {
      isValid = ethers.utils.isAddress(address);
    } else if (chain === "Solana") {
      const publicKey = new solanaWeb3.PublicKey(address);
      isValid = await solanaWeb3.PublicKey.isOnCurve(publicKey);
    }
  }
  return isValid;
};

export const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

export const arrangeCexName = (string: string) => {
  if (string && string === "ftx") {
    return "FTX";
  } else if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

export const toUsd = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const setAppLoading = async (data: boolean) => {
  store.dispatch({
    type: "SET_LOADING",
    payload: {
      data,
    },
  });
};

export const isValidHttpUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};