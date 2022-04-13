import { mainInstance } from "../config/axios";

class InfoService {
  static async getNetWorth() {
    try {
      const res = await mainInstance.get(
        "info/networth",
        { withCredentials: true }
      );
      return res?.data?.netWorth;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  }
}

export default InfoService