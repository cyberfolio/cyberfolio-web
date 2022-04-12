import { mainInstance } from "../config/axios";

export const getDexTokens = async ({ chain }) => {
  try {
    const res = await mainInstance.get(
      `dex/assets/${chain}`,

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

export const getCexTokens = async ({ cexName }) => {
  try {
    const res = await mainInstance.get(
      `/cex/assets/${cexName}`,

      { withCredentials: true }
    );
    if (res?.data?.assets) {
      return res.data?.assets;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    throw new Error(e?.response?.data);
  }
};
