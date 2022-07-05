import Actions from "./actions";
import ALLNetworks from "@assets/blockchain.svg";
import { Cex, AllNetworks, CexAsset, Chain, DexAsset } from "@customTypes/index";

const initialState = {
  loading: {
    state: false,
    message: "",
  },
  evmAddress: "",
  ensName: "",
  lastAssetUpdate: "",
  netWorth: 0,
  platform: {
    name: AllNetworks.ALLNETWORKS as Cex | Chain | AllNetworks,
    image: ALLNetworks,
  },
  isWalletModalOpen: {
    open: false,
    chain: Chain.NO,
  },
  isAddCexModalOpen: {
    open: false,
    name: Cex.NO,
  },
  dexAssets: [] as DexAsset[],
  cexAssets: [] as CexAsset[],
  connectedCexes: [] as Cex[],
  connectedChains: [] as Chain[],
};

const reducer = (state = initialState, action: Actions) => {
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: {
        state: action.payload.state,
        message: action.payload.message,
      },
    };
  } else if (action.type === "SET_CONNECTED_CEXES") {
    return {
      ...state,
      connectedCexes: action.payload.data,
    };
  } else if (action.type === "SET_CONNECTED_CHAINS") {
    return {
      ...state,
      connectedChains: action.payload.data,
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
  } else if (action.type === "SET_LAST_ASSET_UPDATE") {
    return {
      ...state,
      lastAssetUpdate: action.payload.data,
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
        name: action.payload.platform,
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
