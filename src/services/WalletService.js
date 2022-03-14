import { mainInstance } from "../config/axios";

export const addWallet = async ({ address, name }) => {
  try {
    const res = await mainInstance.post(
      "/wallets/add",
      {
        wallets: [{ name, address }],
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
