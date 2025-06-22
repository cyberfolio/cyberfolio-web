import AppStructures from "structures/index";
import { ConnectedCexPayload, ConnectedWalletPayload } from "./types";

type Actions =
  | { type: "SET_LOADING"; payload: { state: boolean; message: string } }
  | { type: "SET_EVM_ADDRESS"; payload: string }
  | { type: "SET_LAST_ASSET_UPDATE"; payload: string }
  | { type: "SET_NET_WORTH"; payload: number }
  | { type: "SET_ENS_NAME"; payload: string }
  | { type: "SET_CONNECTED_CEXES"; payload: ConnectedCexPayload[] }
  | { type: "SET_CONNECTED_WALLETS"; payload: ConnectedWalletPayload[] }
  | {
      type: "FILTER_ASSETS_BY_PLATFORM";
      payload: {
        platform: AppStructures.Chain | AppStructures.Cex | AppStructures.AllNetworks;
        image: string;
      };
    }
  | { type: "OPEN_WALLET_MODAL"; payload: { open: boolean; chain: AppStructures.Chain } }
  | { type: "OPEN_ADD_CEX_MODAL"; payload: { open: boolean; name: AppStructures.Cex } }
  | { type: "SET_CEX_ASSETS"; payload: AppStructures.CexAsset[] }
  | { type: "SET_DEX_ASSETS"; payload: AppStructures.DexAsset[] };

export default Actions;
