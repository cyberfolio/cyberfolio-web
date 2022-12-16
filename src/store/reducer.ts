import Actions from "./actions";
import ALLNetworks from "@assets/blockchain.svg";
import { Cex, AllNetworks, CexAsset, Chain, DexAsset } from "@app-types/index";
import { ConnectedCexPayload, ConnectedWalletPayload } from "./types";

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
  connectedCexes: [] as ConnectedCexPayload[],
  connectedWallets: [] as ConnectedWalletPayload[],
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
      connectedCexes: action.payload,
    };
  } else if (action.type === "SET_CONNECTED_WALLETS") {
    return {
      ...state,
      connectedWallets: action.payload,
    };
  } else if (action.type === "SET_EVM_ADDRESS") {
    return {
      ...state,
      evmAddress: action.payload,
    };
  } else if (action.type === "SET_ENS_NAME") {
    return {
      ...state,
      ensName: action.payload,
    };
  } else if (action.type === "SET_LAST_ASSET_UPDATE") {
    return {
      ...state,
      lastAssetUpdate: action.payload,
    };
  } else if (action.type === "SET_NET_WORTH") {
    return {
      ...state,
      netWorth: action.payload,
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
      cexAssets: action.payload,
    };
  } else if (action.type === "SET_DEX_ASSETS") {
    return {
      ...state,
      dexAssets: action.payload,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default reducer;
