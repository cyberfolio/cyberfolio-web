import { Cex, CexAsset, AllNetworks, Chain, DexAsset } from "@customTypes/index";
import { ConnectedWallets } from "@services/info/types";

type Actions =
  | { type: "SET_LOADING"; payload: { state: boolean; message: string } }
  | { type: "SET_EVM_ADDRESS"; payload: { data: string } }
  | { type: "SET_LAST_ASSET_UPDATE"; payload: { data: string } }
  | { type: "SET_NET_WORTH"; payload: { data: number } }
  | { type: "SET_ENS_NAME"; payload: { data: string } }
  | { type: "SET_CONNECTED_CEXES"; payload: { data: Cex[] } }
  | { type: "SET_CONNECTED_WALLETS"; payload: { data: ConnectedWallets[] } }
  | {
      type: "FILTER_ASSETS_BY_PLATFORM";
      payload: {
        platform: Chain | Cex | AllNetworks;
        image: string;
      };
    }
  | { type: "OPEN_WALLET_MODAL"; payload: { open: boolean; chain: Chain } }
  | { type: "OPEN_ADD_CEX_MODAL"; payload: { open: boolean; name: Cex } }
  | { type: "SET_CEX_ASSETS"; payload: { data: CexAsset[] } }
  | { type: "SET_DEX_ASSETS"; payload: { data: DexAsset[] } };

export default Actions;
