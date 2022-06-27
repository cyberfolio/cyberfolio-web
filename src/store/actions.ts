import { Platform } from "@customTypes/index";

type Actions =
  | { type: "SET_LOADING"; payload: { state: boolean; message: string } }
  | { type: "SET_EVM_ADDRESS"; payload: { data: string } }
  | { type: "SET_LAST_ASSET_UPDATE"; payload: { data: string } }
  | { type: "SET_NET_WORTH"; payload: { data: number } }
  | { type: "SET_ENS_NAME"; payload: { data: string } }
  | {
      type: "FILTER_ASSETS_BY_PLATFORM";
      payload: {
        platform: Platform;
        image: string;
      };
    }
  | { type: "OPEN_WALLET_MODAL"; payload: { open: boolean; chain: string } }
  | { type: "OPEN_ADD_CEX_MODAL"; payload: { open: boolean; name: string } }
  | { type: "SET_CEX_ASSETS"; payload: { data: any } }
  | { type: "SET_DEX_ASSETS"; payload: { data: any } };

export default Actions;
