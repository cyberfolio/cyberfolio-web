import Actions from "./actions";
import AllNetworks from "../assets/blockchain.svg";

const initialState = {
  loading: false,
  evmAddress: "",
  ensName: "",
  platform: {
    name: "All Networks",
    image: AllNetworks,
  },
  isWalletModalOpen: {
    open: false,
    chain: "",
  },
  isAddCexModalOpen: {
    open: false,
    name: "",
  },
  dexAssets: [
    {
      name: "",
      platform: "",
    },
  ],
  cexAssets: [
    {
      cexName: "",
    },
  ],
  netWorth: 0,
};

const reducer = (state = initialState, action: Actions) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload.data,
    };
  } else if (action.type === "SET_EVM_ADDRESS") {
    return {
      ...state,
      evmAddress: action.payload.data,
    };
  } else if (action.type === "SET_ENS_NAME") {
    return {
      ...state,
      ensName: action.payload.data,
    };
  } else if (action.type === "SET_NET_WORTH") {
    return {
      ...state,
      netWorth: action.payload.data,
    };
  } else if (action.type === "FILTER_ASSETS_BY_PLATFORM") {
    return {
      ...state,
      platform: {
        name: action.payload.name,
        image: action.payload.image,
      },
    };
  } else if (action.type === "OPEN_WALLET_MODAL") {
    return {
      ...state,
      isWalletModalOpen: {
        open: action.payload.open,
        chain: action.payload.chain,
      },
    };
  } else if (action.type === "OPEN_ADD_CEX_MODAL") {
    return {
      ...state,
      isAddCexModalOpen: {
        open: action.payload.open,
        name: action.payload.name,
      },
    };
  } else if (action.type === "SET_CEX_ASSETS") {
    return {
      ...state,
      cexAssets: action.payload.data,
    };
  } else if (action.type === "SET_DEX_ASSETS") {
    return {
      ...state,
      dexAssets: action.payload.data,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default reducer;
