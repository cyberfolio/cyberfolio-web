import { mainInstance } from "../config/axios";

export const isAuthenticated = async () => {
  try {
    const res = await mainInstance.get("/authenticated", {
      withCredentials: true,
    });
    if (res?.data) {
      return res?.data?.keyIdentifier;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const logout = async () => {
  try {
    await mainInstance.get("/logout", {
      withCredentials: true,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const getNonce = async ({ evmAddress }) => {
  try {
    const res = await mainInstance.post("/login/metamask", { evmAddress });
    if (res?.data?.nonce) {
      return res?.data?.nonce;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const validateSignature = async ({ evmAddress, nonce, signature }) => {
  try {
    const res = await mainInstance.post(
      "/login/validateSignature",
      {
        evmAddress,
        nonce,
        signature,
      },
      { withCredentials: true }
    );
    if (res?.data) {
      return res?.data;
    } else {
      throw new Error("aaa went wrong");
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
