import { Cex, Chain } from "structures/index";

export interface ConnectedWallets {
  chain: Chain;
  walletName: string;
  walletAddress: string;
  netWorth: number;
}

export type ConnectedCexes = {
  name: Cex;
  netWorth: number;
};
export interface ConnectedAccountsResponse {
  cexes: ConnectedCexes[];
  wallets: ConnectedWallets[];
}
