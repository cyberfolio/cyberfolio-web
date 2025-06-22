import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [react(), viteTsconfigPaths({}), svgr({ dimensions: false })],
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    },
    server: {
      host: "127.0.0.1",
      port: 4000,
      watch: {
        ignored: ["**/.env/**"],
      },
    },
    preview: {
      host: true,
      port: 5000,
    },
  };
});
