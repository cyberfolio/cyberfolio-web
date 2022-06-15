import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

import reducer from "./reducer";

const store = configureStore({
  reducer,
  middleware: new MiddlewareArray(), // vital for typing useAppDispatch
});

export default store;
