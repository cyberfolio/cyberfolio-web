import Actions from "./actions";
import AllNetworks from "../assets/blockchain.svg";

const initialState = {
  loading: false,
  evmAddress: "",
  ensName: "",
  chain: {
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
  dexAssets: [],
  cexAssets: [],
  netWorth: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }

    case Actions.SET_EVM_ADDRESS: {
      return {
        ...state,
        evmAddress: action.payload.data,
      };
    }

    case Actions.SET_ENS_NAME: {
      return {
        ...state,
        ensName: action.payload.data,
      };
    }

    case Actions.SET_NET_WORTH: {
      return {
        ...state,
        netWorth: action.payload.data,
      };
    }

    case Actions.FILTER_ASSETS_BY_CHAIN: {
      return {
        ...state,
        chain: action.payload.data,
      };
    }

    case Actions.OPEN_WALLET_MODAL: {
      return {
        ...state,
        isWalletModalOpen: {
          open: action.payload.open,
          chain: action.payload.chain,
        },
      };
    }

    case Actions.OPEN_ADD_CEX_MODAL: {
      return {
        ...state,
        isAddCexModalOpen: {
          open: action.payload.open,
          name: action.payload.name,
        },
      };
    }

    case Actions.SET_CEX_ASSETS: {
      return {
        ...state,
        cexAssets: [...state.cexAssets, ...action.payload.data],
      };
    }

    case Actions.SET_DEX_ASSETS: {
      return {
        ...state,
        cexAssets: [...state.dexAssets, ...action.payload.data],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
