import { mainInstance } from "../config/axios";

export const addCex = async ({ apiKey, apiSecret, cexName, passphrase }) => {
  try {
    const res = await mainInstance.post(
      "/cex/add",
      {
        apiKey,
        apiSecret,
        cexName,
        passphrase
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
};
