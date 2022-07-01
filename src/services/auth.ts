import { mainInstance } from "@config/axios";

export default class AuthService {
  static async getUserInfo() {
    try {
      const res = await mainInstance.get("/auth/get-user-info", {
        withCredentials: true,
      });
      return res?.data;
    } catch (e) {
      return false;
    }
  }

  static async logout() {
    try {
      await mainInstance.get("/auth/logout", {
        withCredentials: true,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getNonce({ evmAddress }: { evmAddress: string }) {
    try {
      const res = await mainInstance.post("/auth/login/metamask", { evmAddress });
      if (res?.data?.nonce) {
        return res?.data?.nonce;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async validateSignature({
    evmAddress,
    nonce,
    signature,
  }: {
    evmAddress: string;
    nonce: string;
    signature: string;
  }) {
    try {
      const res = await mainInstance.post(
        "/auth/login/validate-signature",
        {
          evmAddress,
          nonce,
          signature,
        },
        { withCredentials: true },
      );
      if (res?.data) {
        return res?.data;
      } else {
        throw new Error("aaa went wrong");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
