import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./app";
import store from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <Provider store={store}>
    <StrictMode>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </StrictMode>
  </Provider>,
);
