import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              {
                displayName: true,
                fileName: true,
                meaninglessFileNames: ["index", "styles"],
                minify: true,
                transpileTemplateLiterals: false,
                pure: true,
                preprocess: false,
              },
            ],
          ],
        },
      }),
      viteTsconfigPaths({}),
      svgr({ dimensions: false }),
    ],
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
