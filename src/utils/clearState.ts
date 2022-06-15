import store from "@store/index";

const clearState = async () => {
  store.dispatch({
    type: "SET_EVM_ADDRESS",
    payload: {
      data: "",
    },
  });
  store.dispatch({
    type: "SET_NET_WORTH",
    payload: {
      data: 0,
    },
  });
  store.dispatch({
    type: "SET_CEX_ASSETS",
    payload: {
      data: [],
    },
  });
  store.dispatch({
    type: "SET_DEX_ASSETS",
    payload: {
      data: [],
    },
  });
};

export default clearState;
