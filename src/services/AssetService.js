import { mainInstance } from "../config/axios";

export const getDexTokens = async ({ chain }) => {
  try {
    const res = await mainInstance.get(
      `/tokens/dex?chain=${chain}`,

      { withCredentials: true }
    );
    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    throw new Error(e?.response?.data);
  }
};

export const getCexTokens = () => {
  return [
    {
      name: "BNB",
      price: 370,
      balance: 10,
      value: 3700,
      place: "Binance",
    },
    {
      name: "HOLO",
      price: 0.01,
      balance: 2400,
      value: 24,
      place: "FTX",
    },
    {
      name: "DENT",
      price: 0.001,
      balance: 2400,
      value: 2.4,
      place: "FTX",
    },
  ];
};
