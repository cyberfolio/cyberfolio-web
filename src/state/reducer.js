import { ACTIONS } from "./actions";
import AllNetworks from "../assets/blockchain.svg";

const initialState = {
  loading: false,
  evmAddress: "",
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
  netWorth: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: action.payload.data,
      };
    }

    case ACTIONS.SET_EVM_ADDRESS: {
      return {
        ...state,
        evmAddress: action.payload.data,
      };
    }

    case ACTIONS.ADD_NET_WORTH: {
      return {
        ...state,
        netWorth: state.netWorth + action.payload.data,
      };
    }

    case ACTIONS.FILTER_ASSETS_BY_CHAIN: {
      return {
        ...state,
        chain: action.payload.data,
      };
    }

    case ACTIONS.OPEN_WALLET_MODAL: {
      return {
        ...state,
        isWalletModalOpen: {
          open: action.payload.open,
          chain: action.payload.chain,
        },
      };
    }

    case ACTIONS.OPEN_ADD_CEX_MODAL: {
      return {
        ...state,
        isAddCexModalOpen: {
          open: action.payload.open,
          name: action.payload.name,
        },
      };
    }

    case ACTIONS.SET_CEX_ASSETS: {
      return {
        ...state,
        cexAssets: [...state.cexAssets, ...action.payload.cexAssets],
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
