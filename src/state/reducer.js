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

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
