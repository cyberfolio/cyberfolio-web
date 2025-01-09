import "@rainbow-me/rainbowkit/styles.css";
import "./styles/global.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./app";
import store from "./store";
import AppConfig from "config";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <WagmiProvider config={AppConfig.RainbowKit}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </Provider>,
);
