import { mainInstance } from "../config/axios";

class DexService {
  static async addWallet({ address, name, chain }) {
    try {
      await mainInstance.post(
        "dex/add",
        {
          wallets: [{ name, address, chain }],
        },
        { withCredentials: true }
      );
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }

  static async getDexTokens({ chain }) {
    try {
      const res = await mainInstance.get(
        `dex/assets/${chain}`,

        { withCredentials: true }
      );
      if (res?.data) {
        return res.data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }
}

export default DexService
