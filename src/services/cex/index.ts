import AppStructures from "structures/index";
import { PaymentHistoryResponse } from "./types";
import AppConfig from "config/index";

export default class CexService {
  static async addCex({
    apiKey,
    apiSecret,
    cexName,
    passphrase,
  }: {
    apiKey: string;
    apiSecret: string;
    cexName: AppStructures.Cex;
    passphrase: string;
  }) {
    try {
      await AppConfig.Axios.post(
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
      const res = await AppConfig.Axios.get(
        `/cex/assets`,

        { withCredentials: true },
      );
      if (res?.data?.assets) {
        return res.data?.assets as AppStructures.CexAsset[];
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e.response?.data);
    }
  }

  static async deleteCex({ cexName }: { cexName: AppStructures.Cex }) {
    try {
      await AppConfig.Axios.post(
        `/cex/delete`,
        {
          cexName,
        },
        { withCredentials: true },
      );
    } catch (e) {
      throw new Error(e.response?.data);
    }
  }

  static async getPaymentHistory() {
    try {
      const res = await AppConfig.Axios.get<PaymentHistoryResponse[]>(`/cex/payment-history`, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw new Error(e.response?.data);
    }
  }
}
