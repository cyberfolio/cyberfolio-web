import { ACTIONS } from "./actions";

const initialState = {
  evmAddress: "",
  chain: {
    name: "All Networks",
    image: `${process.env.REACT_APP_URL}/logos/blockchain.svg`,
  },
  isWalletModalOpen: {
    open: false,
    chain: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_EVM_ADDRESS: {
      return {
        ...state,
        evmAddress: action.payload.data,
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

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
