/* eslint-disable no-throw-literal */
import { mainInstance } from "config/axios";

class StockService {
  static async getInteractiveBrokers() {
    try {
      const res = await mainInstance.get("stock/interactive-brokers", {
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

export default StockService;
