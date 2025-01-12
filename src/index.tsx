import "./styles/global.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import App from "./app";
import store from "./store";
import AppConfig from "config";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <WagmiProvider config={AppConfig.Wagmi}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </WagmiProvider>
  </Provider>,
);
