import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address) => {
  const match = String(address).match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const chainsInfo = [
  {
    name: "All Networks",
    image: `${process.env.REACT_APP_URL}/logos/blockchain.svg`,
  },
  {
    name: "Bitcoin",
    image: `${process.env.REACT_APP_URL}/logos/bitcoin.svg`,
  },
  {
    name: "Ethereum",
    image: `${process.env.REACT_APP_URL}/logos/ethereum.svg`,
  },
  {
    name: "Smart Chain",
    image: `${process.env.REACT_APP_URL}/logos/smartchain.svg`,
  },
  {
    name: "Avalanche",
    image: `${process.env.REACT_APP_URL}/logos/avalanche.svg`,
  },
  {
    name: "Solana",
    image: `${process.env.REACT_APP_URL}/logos/solana.svg`,
  },
  {
    name: "Polkadot",
    image: `${process.env.REACT_APP_URL}/logos/polkadot.svg`,
  },
  {
    name: "Polygon",
    image: `${process.env.REACT_APP_URL}/logos/polygon.svg`,
  },
  {
    name: "Arbitrum",
    image: `${process.env.REACT_APP_URL}/logos/arbitrum.svg`,
  },
  {
    name: "Optimism",
    image: `${process.env.REACT_APP_URL}/logos/optimism.svg`,
  },
  {
    name: "Binance",
    image: `${process.env.REACT_APP_URL}/logos/binance.svg`,
  },
  {
    name: "Kucoin",
    image: `${process.env.REACT_APP_URL}/logos/kucoin.png`,
  },
  {
    name: "Gateio",
    image: `${process.env.REACT_APP_URL}/logos/gateio.svg`,
  },
  {
    name: "FTX",
    image: `${process.env.REACT_APP_URL}/logos/ftx.svg`,
  },
];

const validateBtcAddress = (address) => {
  if (address.length < 26 || address.length > 35) {
    return false;
  }
  let re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    return false;
  }
  return true;
};

export const isValidWalletAddress = async ({ address, chain }) => {
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

export const capitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

export const arrangeCexName = (string) => {
  if (string && string === "ftx") {
    return "FTX";
  } else if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

export const toUsd = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
