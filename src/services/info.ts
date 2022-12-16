/* eslint-disable no-throw-literal */
import { mainInstance } from "@config/axios";
import { Chain, Cex } from "@app-types/index";

interface ConnectedWallets {
  name: string;
  chain: Chain;
  address: string;
  scan: string;
  netWorth: number;
}

interface ConnectedCexes {
  name: Cex;
  netWorth: number;
}

export interface ConnectedAccountsResponse {
  cexes: ConnectedCexes[];
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
