import store from "../store";
import ACTIONS from "../store/actions";

const clearState = async () => {
  store.dispatch({
    type: ACTIONS.SET_EVM_ADDRESS,
    payload: {
      data: "",
    },
  });
  store.dispatch({
    type: ACTIONS.SET_NET_WORTH,
    payload: {
      data: 0,
    },
  });
  store.dispatch({
    type: ACTIONS.SET_CEX_ASSETS,
    payload: {
      data: [],
    },
  });
  store.dispatch({
    type: ACTIONS.SET_DEX_ASSETS,
    payload: {
      data: [],
    },
  });
};

export default clearState;
