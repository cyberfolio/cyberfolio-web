import "@rainbow-me/rainbowkit/styles.css";
import "./styles/global.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./app";
import store from "./store";
import AppConstants from "constants/index";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

const config = getDefaultConfig({
  appName: AppConstants.WalletConnectProjectName,
  projectId: AppConstants.WalletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(AppConstants.ETHMainnetRPCPRoviderURL),
    // [sepolia.id]: http(AppConstants.ETHSepholiaRPCPRoviderURL),
  },
});
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <WagmiProvider config={config}>
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
