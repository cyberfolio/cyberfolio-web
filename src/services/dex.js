import { mainInstance } from "../config/axios";

export const addWallet = async ({ address, name, chain }) => {
  try {
    await mainInstance.post(
      "dex/add",
      {
        wallets: [{ name, address, chain }],
      },
      { withCredentials: true }
    );
    
  } catch (e) {
    throw new Error(e?.response?.data);
  }
};
