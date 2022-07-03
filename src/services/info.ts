/* eslint-disable no-throw-literal */
import { mainInstance } from "@config/axios";
import { Chain, Cex } from "@customTypes/index";

interface AvailableAccountsRes {
  availableCexes: Cex[];
  availableChains: Chain[];
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

  static async getAvailableAccounts() {
    try {
      const res = await mainInstance.get<AvailableAccountsRes>("info/available-accounts", {
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
