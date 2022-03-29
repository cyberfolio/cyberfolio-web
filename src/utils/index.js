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
    image: "http://localhost:4000/logos/blockchain.svg",
  },
  {
    name: "Bitcoin",
    image: "http://localhost:4000/logos/bitcoin.svg",
  },
  {
    name: "Ethereum",
    image: "http://localhost:4000/logos/ethereum.svg",
  },
  {
    name: "Smart Chain",
    image: "http://localhost:4000/logos/bsc.svg",
  },
  {
    name: "Avalanche",
    image: "http://localhost:4000/logos/avalanche.svg",
  },
  {
    name: "Solana",
    image: "http://localhost:4000/logos/solana.svg",
  },
  {
    name: "Polkadot",
    image: "http://localhost:4000/logos/polkadot.svg",
  },
  {
    name: "Polygon",
    image: "http://localhost:4000/logos/polygon.svg",
  },
  {
    name: "Arbitrum",
    image: "http://localhost:4000/logos/arbitrum.svg",
  },
  {
    name: "Optimism",
    image: "http://localhost:4000/logos/optimism.svg",
  },
  {
    name: "Binance",
    image: "http://localhost:4000/logos/binance.svg",
  },
  {
    name: "Kucoin",
    image: "http://localhost:4000/logos/kucoin.png",
  },
  {
    name: "Gateio",
    image: "http://localhost:4000/logos/gateio.svg",
  },
  {
    name: "FTX",
    image: "http://localhost:4000/logos/ftx.svg",
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
