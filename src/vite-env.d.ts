/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface Window {
  ethereum?: any;
}

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
