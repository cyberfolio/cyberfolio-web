import Actions from "./actions";
import AppStructures from "structures/index";
import { ConnectedCexPayload, ConnectedWalletPayload } from "./types";
import AppAssets from "assets/index";

interface initialState {
  loading: {
    state: boolean;
    message: string;
  };
  evmAddress: string;
  ensName: string;
  lastAssetUpdate: string;
  netWorth: number;
  platform: {
    name: AppStructures.Cex | AppStructures.Chain | AppStructures.AllNetworks;
    image: string;
  };
  isWalletModalOpen: {
    open: boolean;
    chain: AppStructures.Chain;
  };
  isAddCexModalOpen: {
    open: boolean;
    name: AppStructures.Cex;
  };
  dexAssets: AppStructures.DexAsset[];
  cexAssets: AppStructures.CexAsset[];
  connectedCexes: ConnectedCexPayload[];
  connectedWallets: ConnectedWalletPayload[];
}

const initialState: initialState = {
  loading: {
    state: false,
    message: "",
  },
  evmAddress: "",
  ensName: "",
  lastAssetUpdate: "",
  netWorth: 0,
  platform: {
    name: AppStructures.AllNetworks.ALLNETWORKS as AppStructures.Cex | AppStructures.Chain | AppStructures.AllNetworks,
    image: AppAssets.Icons.BlockChain,
  },
  isWalletModalOpen: {
    open: false,
    chain: AppStructures.Chain.NO,
  },
  isAddCexModalOpen: {
    open: false,
    name: AppStructures.Cex.NO,
  },
  dexAssets: [] as AppStructures.DexAsset[],
  cexAssets: [] as AppStructures.CexAsset[],
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
