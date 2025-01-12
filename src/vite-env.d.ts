/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface Window {
  ethereum?: any;
}

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_ALCHEMY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
