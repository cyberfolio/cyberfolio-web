import { Cex, Chain } from "structures/index";

export type ConnectedCexPayload = {
  name: Cex;
  netWorth: number;
};
export type ConnectedWalletPayload = {
  name: string;
  chain: Chain;
  address: string;
  scan: string;
  netWorth: number;
};
