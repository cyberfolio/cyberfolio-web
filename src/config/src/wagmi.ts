/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppConstants from "constants/index";

import { mainnet, sepolia } from "wagmi/chains";
import { http, createConfig } from "wagmi";
import AppUtils from "utils";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof Wagmi;
  }
}

const Wagmi = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(`${AppConstants.ETHMainnetRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
    [sepolia.id]: http(`${AppConstants.ETHSepholiaRPCPRoviderURL}/${import.meta.env.VITE_ALCHEMY_API_KEY}`),
  },
  connectors: [
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID }),
    metaMask(),
    safe(),
  ],
});

export default Wagmi;
