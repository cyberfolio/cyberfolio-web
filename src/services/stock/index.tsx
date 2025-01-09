import AppConfig from "config";
class StockService {
  static async getInteractiveBrokers() {
    try {
      const res = await AppConfig.Axios.get("stock/interactive-brokers", {
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
