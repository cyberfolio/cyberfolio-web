import { mainInstance } from "../config/axios";

class CexService {
  static async addCex({ apiKey, apiSecret, cexName, passphrase }) {
    try {
      const res = await mainInstance.post(
        "/cex/add",
        {
          apiKey,
          apiSecret,
          cexName,
          passphrase,
        },
        { withCredentials: true }
      );
      if (res?.data?.assets) {
        return res?.data?.assets;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }

  static async getCexTokens({ cexName }) {
    try {
      const res = await mainInstance.get(
        `/cex/assets/${cexName}`,

        { withCredentials: true }
      );
      if (res?.data?.assets) {
        return res.data?.assets;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }
}

export default CexService

