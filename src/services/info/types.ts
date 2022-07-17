import { Cex, Chain } from "@customTypes/index";

export interface ConnectedWallets {
  chain: Chain;
  walletName: string;
  walletAddress: string;
}

export interface ConnectedAccountsResponse {
  cexes: Cex[];
  wallets: ConnectedWallets[];
}
