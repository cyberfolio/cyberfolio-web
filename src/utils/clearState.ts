import store from "@store/index";

const clearState = async () => {
  store.dispatch({
    type: "SET_EVM_ADDRESS",
    payload: "",
  });
  store.dispatch({
    type: "SET_ENS_NAME",
    payload: "",
  });
  store.dispatch({
    type: "SET_NET_WORTH",
    payload: 0,
  });
  store.dispatch({
    type: "SET_LAST_ASSET_UPDATE",
    payload: "",
  });
  store.dispatch({
    type: "SET_CEX_ASSETS",
    payload: [],
  });
  store.dispatch({
    type: "SET_DEX_ASSETS",
    payload: [],
  });
  store.dispatch({
    type: "SET_CONNECTED_CEXES",
    payload: [],
  });
  store.dispatch({
    type: "SET_CONNECTED_WALLETS",
    payload: [],
  });
};

export default clearState;
