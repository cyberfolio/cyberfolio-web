import { mainInstance } from "@config/axios";
import { Chain, DexAsset } from "@customTypes/index";

interface DexTokens {
  assets: DexAsset[];
  totalTokenValue: number;
}
class DexService {
  static async addWallet({ address, name, chain }: { address: string; name: string; chain: string }) {
    try {
      await mainInstance.post(
        "dex/add",
        {
          wallets: [{ name, address, chain }],
        },
        { withCredentials: true },
      );
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }

  static async getDexTokens({ chain }: { chain: Chain }) {
    try {
      const res = await mainInstance.get(
        `dex/assets/${chain}`,

        { withCredentials: true },
      );
      if (res?.data) {
        return res.data as DexTokens;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }
}

export default DexService;
