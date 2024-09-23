import { mainInstance } from "config/axios";
import { Chain, DexAsset } from "structures/index";

interface DexTokens {
  assets: DexAsset[];
  totalTokenValue: number;
}
export default class DexService {
  static async addWallet({ address, name, chain }: { address: string; name: string; chain: Chain }) {
    try {
      await mainInstance.post(
        "dex/add",
        {
          wallets: [{ name, address, chain }],
        },
        { withCredentials: true },
      );
    } catch (e) {
      throw new Error(e.response.data);
    }
  }

  static async getDexTokens({ chain }: { chain: Chain }) {
    try {
      const res = await mainInstance.get<DexTokens>(`dex/assets/${chain}`, { withCredentials: true });
      return res.data;
    } catch (e) {
      throw new Error(e.response.data);
    }
  }

  static async getAllDexTokens() {
    try {
      const res = await mainInstance.get<DexTokens>(`dex/assets`, { withCredentials: true });
      return res.data;
    } catch (e) {
      throw new Error(e.response.data);
    }
  }

  static async deleteWallet({ chain, address }: { chain: Chain; address: string }) {
    try {
      await mainInstance.post(
        `dex/delete`,
        {
          address,
          chain,
        },
        { withCredentials: true },
      );
    } catch (e) {
      throw new Error(e.response.data);
    }
  }
}
