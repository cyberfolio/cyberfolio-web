import { createStore } from "redux";
import reducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, enableReduxDevTools);
const persistor = persistStore(store);

export { store, persistor };
