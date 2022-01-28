import { ACTIONS } from "./actions";

const initialState = {
  evmAddress: "",
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

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
