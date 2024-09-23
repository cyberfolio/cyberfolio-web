import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

import Bitcoin from "assets/bitcoin.svg";
import Ethereum from "assets/ethereum.svg";
import SmartChain from "assets/smartchain.svg";
import Avalanche from "assets/avalanche.svg";
import Solana from "assets/solana.svg";
import Polkadot from "assets/polkadot.svg";
import Polygon from "assets/polygon.svg";
import Arbitrum from "assets/arbitrum.svg";
import Optimism from "assets/optimism.svg";
import Binance from "assets/binance.svg";
import Kucoin from "assets/kucoin.png";
import Gateio from "assets/gateio.svg";

import store from "store/index";
import { Cex, Chain } from "structures/index";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

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
    name: Cex.BINANCETR,
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
      return ethers.isAddress(address);
    case Chain.SOLANA:
      return isValidSolanaAddress(address);
    default:
      return false;
  }
};

const isValidSolanaAddress = (address: string) => {
  try {
    return solanaWeb3.PublicKey.isOnCurve(address);
  } catch (e) {
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

const timestampToReadableDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};
const cexAPIKeyURL = {
  [Cex.BINANCE]: "https://www.binance.com/en/my/settings/api-management",
  [Cex.BINANCETR]: "https://www.trbinance.com/usercenter/settings/api-management",
  [Cex.GATEIO]: "https://www.gate.io/myaccount/apikeys",
  [Cex.KUCOIN]: "https://www.kucoin.com/account/api?spm=kcWeb.B1assets.person.8",
  [Cex.NO]: "",
};

export default {
  toReadableDateDifference,
  timestampToReadableDate,
  isValidHttpUrl,
  setAppLoading,
  toUsd,
  arrangeCexName,
  capitalizeFirstLetter,
  isValidWalletAddress,
  cexInfo,
  chainInfo,
  truncateEthAddress,
  cexAPIKeyURL,
};
