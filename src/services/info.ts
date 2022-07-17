/* eslint-disable no-throw-literal */
import { mainInstance } from "@config/axios";
import { Chain, Cex } from "@customTypes/index";

interface ConnectedWallets {
  chain: Chain;
  walletName: string;
  walletAddress: string;
}

export interface ConnectedAccountsResponse {
  cexes: Cex[];
  wallets: ConnectedWallets[];
}

class InfoService {
  static async getNetWorth() {
    try {
      const res = await mainInstance.get("info/networth", {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw {
        status: e?.response?.status,
        message: e?.response?.data,
      };
    }
  }

  static async getConnectedAccounts() {
    try {
      const res = await mainInstance.get<ConnectedAccountsResponse>("info/connected-accounts", {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw {
        status: e?.response?.status,
        message: e?.response?.data,
      };
    }
  }

  static async getEnsName() {
    try {
      const res = await mainInstance.get("info/ens-name", {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw {
        status: e?.response?.status,
        message: e?.response?.data,
      };
    }
  }
}

export default InfoService;
