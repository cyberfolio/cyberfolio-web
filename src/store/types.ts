import AppStructures from "structures/index";

export type ConnectedCexPayload = {
  name: AppStructures.Cex;
  netWorth: number;
};
export type ConnectedWalletPayload = {
  name: string;
  chain: AppStructures.Chain;
  address: string;
  scan: string;
  netWorth: number;
};
