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
import { Platform } from "@customTypes/index";

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

const platformInfo = [
  {
    name: Platform.ALLNETWORKS,
    image: AllNetworks,
  },
  {
    name: Platform.BITCOIN,
    image: Bitcoin,
  },
  {
    name: Platform.ETHEREUM,
    image: Ethereum,
  },
  {
    name: Platform.BSC,
    image: SmartChain,
  },
  {
    name: Platform.AVALANCHE,
    image: Avalanche,
  },
  {
    name: Platform.SOLANA,
    image: Solana,
  },
  {
    name: Platform.POLKADOT,
    image: Polkadot,
  },
  {
    name: Platform.POLYGON,
    image: Polygon,
  },
  {
    name: Platform.ARBITRUM,
    image: Arbitrum,
  },
  {
    name: Platform.OPTIMISM,
    image: Optimism,
  },
  {
    name: Platform.BINANCE,
    image: Binance,
  },
  {
    name: Platform.KUCOIN,
    image: Kucoin,
  },
  {
    name: Platform.GATEIO,
    image: Gateio,
  },
  {
    name: Platform.FTX,
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

const isValidWalletAddress = async ({ address, chain }: { address: string; chain: string }) => {
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

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};

const arrangeCexName = (string: string) => {
  if (string && string === "ftx") {
    return "FTX";
  } else if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
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
  platformInfo,
  truncateEthAddress,
  logos,
};
