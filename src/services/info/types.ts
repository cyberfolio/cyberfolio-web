import AppStructures from "structures/index";

export interface ConnectedWallets {
  chain: AppStructures.Chain;
  walletName: string;
  walletAddress: string;
  netWorth: number;
}

export type ConnectedCexes = {
  name: AppStructures.Cex;
  netWorth: number;
};
export interface ConnectedAccountsResponse {
  cexes: ConnectedCexes[];
  wallets: ConnectedWallets[];
}
