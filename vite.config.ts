import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import path from "path";
import { features } from "process";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [react(), svgr({ dimensions: false })],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "src/assets"),
        components: path.resolve(__dirname, "src/components"),
        config: path.resolve(__dirname, "src/config"),
        constants: path.resolve(__dirname, "src/constants"),
        features: path.resolve(__dirname, "src/features"),
        hooks: path.resolve(__dirname, "src/hooks"),
        pages: path.resolve(__dirname, "src/pages"),
        services: path.resolve(__dirname, "src/services"),
        store: path.resolve(__dirname, "src/store"),
        structures: path.resolve(__dirname, "src/structures"),
        styles: path.resolve(__dirname, "src/styles"),
        utils: path.resolve(__dirname, "src/utils"),
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
