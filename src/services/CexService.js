import { mainInstance } from "../config/axios";

export const addCex = async ({ apiKey, apiSecret, cexName }) => {
  try {
    const res = await mainInstance.post(
      "/cex/add",
      {
        apiKey,
        apiSecret,
        cexName,
      },
      { withCredentials: true }
    );
    if (res?.data) {
      return true;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    throw new Error(e?.response?.data);
  }
};
