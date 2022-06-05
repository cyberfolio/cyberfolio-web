import { createStore } from "redux";
import reducer from "./reducer";

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

const store = createStore(reducer, enableReduxDevTools);

export default store;
