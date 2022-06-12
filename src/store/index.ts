import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: new MiddlewareArray().concat(logger), // vital for typing useAppDispatch
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
