import "styles/index.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import App from "./app";
import store from "./store";
import AppConfig from "config/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={AppConfig.Wagmi}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>,
);
