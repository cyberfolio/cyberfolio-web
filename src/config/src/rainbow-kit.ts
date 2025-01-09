import AppConstants from "constants/index";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import { http } from "wagmi";

const RainbowKit = getDefaultConfig({
  appName: AppConstants.WalletConnectProjectName,
  projectId: AppConstants.WalletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(AppConstants.ETHMainnetRPCPRoviderURL),
    // [sepolia.id]: http(AppConstants.ETHSepholiaRPCPRoviderURL),
  },
});

export default RainbowKit;
