import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./app";
import store from "./store";
import "./styles/global.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
  <Provider store={store}>
    <StrictMode>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: 14,
          },
        }}
      />
      <App />
    </StrictMode>
  </Provider>,
);
