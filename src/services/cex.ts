import { mainInstance } from "@config/axios";
import { CexAsset, Cex } from "@customTypes/index";

export default class CexService {
  static async addCex({
    apiKey,
    apiSecret,
    cexName,
    passphrase,
  }: {
    apiKey: string;
    apiSecret: string;
    cexName: Cex;
    passphrase: string;
  }) {
    try {
      await mainInstance.post(
        "/cex/add",
        {
          apiKey,
          apiSecret,
          cexName,
          passphrase,
        },
        { withCredentials: true },
      );
    } catch (e) {
      throw new Error(e.response?.data);
    }
  }

  static async getCexTokens() {
    try {
      const res = await mainInstance.get(
        `/cex/assets`,

        { withCredentials: true },
      );
      if (res?.data?.assets) {
        return res.data?.assets as CexAsset[];
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e.response?.data);
    }
  }
}
