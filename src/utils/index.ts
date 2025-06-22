import { ethers } from "ethers";
import * as solanaWeb3 from "@solana/web3.js";

import store from "store/index";
import AppStructures from "structures/index";
import AppAssets from "assets/index";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = (address: string) => {
  const match = String(address).match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

const chainInfo = [
  {
    name: AppStructures.Chain.BITCOIN,
    image: AppAssets.Icons.Bitcoin,
  },
  {
    name: AppStructures.Chain.ETHEREUM,
    image: AppAssets.Icons.Ethereum,
  },
  {
    name: AppStructures.Chain.BSC,
    image: AppAssets.Icons.SmartChain,
  },
  {
    name: AppStructures.Chain.AVALANCHE,
    image: AppAssets.Icons.Avalanche,
  },
  {
    name: AppStructures.Chain.SOLANA,
    image: AppAssets.Icons.Solana,
  },
  {
    name: AppStructures.Chain.POLKADOT,
    image: AppAssets.Icons.Polkadot,
  },
  {
    name: AppStructures.Chain.POLYGON,
    image: AppAssets.Icons.Polygon,
  },
  {
    name: AppStructures.Chain.ARBITRUM,
    image: AppAssets.Icons.Arbitrum,
  },
  {
    name: AppStructures.Chain.OPTIMISM,
    image: AppAssets.Icons.Optimism,
  },
];

const cexInfo = [
  {
    name: AppStructures.Cex.BINANCE,
    image: AppAssets.Icons.Binance,
  },
  {
    name: AppStructures.Cex.BINANCETR,
    image: AppAssets.Icons.Binance,
  },
  {
    name: AppStructures.Cex.KUCOIN,
    image: AppAssets.Icons.Kucoin,
  },
  {
    name: AppStructures.Cex.GATEIO,
    image: AppAssets.Icons.Gateio,
  },
];

const validateBtcAddress = (address: string) => {
  const re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    return false;
  }
  return true;
};

const isValidWalletAddress = async ({ address, chain }: { address: string; chain: AppStructures.Chain }) => {
  switch (chain) {
    case AppStructures.Chain.BITCOIN:
      return validateBtcAddress(address);
    case AppStructures.Chain.ETHEREUM:
      return ethers.isAddress(address);
    case AppStructures.Chain.SOLANA:
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

const arrangeCexName = (cex: AppStructures.Cex) => {
  switch (cex) {
    case AppStructures.Cex.NO:
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
const cexAPIKeyURL: Record<AppStructures.Cex, string> = {
  [AppStructures.Cex.BINANCE]: "https://www.binance.com/en/my/settings/api-management",
  [AppStructures.Cex.BINANCETR]: "https://www.trbinance.com/usercenter/settings/api-management",
  [AppStructures.Cex.GATEIO]: "https://www.gate.io/myaccount/apikeys",
  [AppStructures.Cex.KUCOIN]: "https://www.kucoin.com/account/api?spm=kcWeb.B1assets.person.8",
  [AppStructures.Cex.NO]: "",
};

const clearState = async () => {
  store.dispatch({
    type: "SET_EVM_ADDRESS",
    payload: "",
  });
  store.dispatch({
    type: "SET_ENS_NAME",
    payload: "",
  });
  store.dispatch({
    type: "SET_NET_WORTH",
    payload: 0,
  });
  store.dispatch({
    type: "SET_LAST_ASSET_UPDATE",
    payload: "",
  });
  store.dispatch({
    type: "SET_CEX_ASSETS",
    payload: [],
  });
  store.dispatch({
    type: "SET_DEX_ASSETS",
    payload: [],
  });
  store.dispatch({
    type: "SET_CONNECTED_CEXES",
    payload: [],
  });
  store.dispatch({
    type: "SET_CONNECTED_WALLETS",
    payload: [],
  });
};

const isProd = import.meta.env.ENV === "prod";

const AppUtils = {
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
  clearState,
  isProd,
};

export default AppUtils;
