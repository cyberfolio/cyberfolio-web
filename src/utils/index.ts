import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

import AllNetworks from "@assets/blockchain.svg";
import Bitcoin from "@assets/bitcoin.svg";
import Ethereum from "@assets/ethereum.svg";
import SmartChain from "@assets/smartchain.svg";
import Avalanche from "@assets/avalanche.svg";
import Solana from "@assets/solana.svg";
import Polkadot from "@assets/polkadot.svg";
import Polygon from "@assets/polygon.svg";
import Arbitrum from "@assets/arbitrum.svg";
import Optimism from "@assets/optimism.svg";
import Binance from "@assets/binance.svg";
import Kucoin from "@assets/kucoin.png";
import Gateio from "@assets/gateio.svg";
import FTX from "@assets/ftx.svg";

import store from "@store/index";
import { Cex, Chain } from "@customTypes/index";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const logos = {
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

const truncateEthAddress = (address: string) => {
  const match = String(address).match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

const chainInfo = [
  {
    name: Chain.BITCOIN,
    image: Bitcoin,
  },
  {
    name: Chain.ETHEREUM,
    image: Ethereum,
  },
  {
    name: Chain.BSC,
    image: SmartChain,
  },
  {
    name: Chain.AVALANCHE,
    image: Avalanche,
  },
  {
    name: Chain.SOLANA,
    image: Solana,
  },
  {
    name: Chain.POLKADOT,
    image: Polkadot,
  },
  {
    name: Chain.POLYGON,
    image: Polygon,
  },
  {
    name: Chain.ARBITRUM,
    image: Arbitrum,
  },
  {
    name: Chain.OPTIMISM,
    image: Optimism,
  },
];

const cexInfo = [
  {
    name: Cex.BINANCE,
    image: Binance,
  },
  {
    name: Cex.KUCOIN,
    image: Kucoin,
  },
  {
    name: Cex.GATEIO,
    image: Gateio,
  },
  {
    name: Cex.FTX,
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

const isValidWalletAddress = async ({ address, chain }: { address: string; chain: Chain }) => {
  switch (chain) {
    case Chain.BITCOIN:
      return validateBtcAddress(address);
    case Chain.ETHEREUM:
      return ethers.utils.isAddress(address);
    case Chain.SOLANA:
      return solanaWeb3.PublicKey.isOnCurve(address);
    default:
      return false;
  }
};

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

const arrangeCexName = (cex: Cex) => {
  switch (cex) {
    case Cex.NO:
      return "";
    case Cex.FTX:
      return "FTX";
    default:
      return cex.charAt(0).toUpperCase() + cex.slice(1);
  }
};

const toUsd = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const setAppLoading = async (state: boolean, message?: string) => {
  store.dispatch({
    type: "SET_LOADING",
    payload: {
      state,
      message: message ? message : "",
    },
  });
};

const isValidHttpUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const toReadableDateDifference = (date1: Date, date2: Date) => {
  const seconds = Math.floor((Number(date2) - Number(date1)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export default {
  toReadableDateDifference,
  isValidHttpUrl,
  setAppLoading,
  toUsd,
  arrangeCexName,
  capitalizeFirstLetter,
  isValidWalletAddress,
  cexInfo,
  chainInfo,
  truncateEthAddress,
  logos,
};
