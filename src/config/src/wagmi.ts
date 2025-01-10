/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppConstants from "constants/index";

import { mainnet, sepolia } from "wagmi/chains";
import { http, WagmiConfig, createConfig } from "wagmi";
import AppUtils from "utils";

// @ts-ignore
import { alchemyProvider } from "wagmi/providers/alchemy";
// @ts-ignore
import { publicProvider } from "wagmi/providers/public";
// @ts-ignore
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// @ts-ignore
import { InjectedConnector } from "wagmi/connectors/injected";
// @ts-ignore
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// @ts-ignore
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// const Wagmi = getDefaultConfig({
//   appName: AppConstants.WalletConnectProjectName,
//   projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
//   chains: [mainnet],
//   transports: {
//     ...(AppUtils.isProd
//       ? { [mainnet.id]: http(`${AppConstants.ETHMainnetRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`) }
//       : { [sepolia.id]: http(`${AppConstants.ETHSepholiaRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`) }),
//   },
// });

declare module "wagmi" {
  interface Register {
    config: typeof Wagmi;
  }
}

const Wagmi = createConfig({
  chains: [mainnet, sepolia],
  // @ts-ignore
  transports: {
    ...(AppUtils.isProd
      ? { [mainnet.id]: http(`${AppConstants.ETHMainnetRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`) }
      : { [sepolia.id]: http(`${AppConstants.ETHSepholiaRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`) }),
  },
});

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }), publicProvider()],
// );

// const Wagmi = createConfig({
//   // @ts-ignore
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
//       },
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// });

export default Wagmi;
