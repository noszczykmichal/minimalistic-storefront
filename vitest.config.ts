import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/vitest.setup.js",
      css: true,
      alias: [
        { find: /^.+\.css$/, replacement: "identity-obj-proxy" },
        { find: /^.+\.scss$/, replacement: "identity-obj-proxy" },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router"],
            apollo: ["@apollo/client", "graphql"],
            redux: ["@reduxjs/toolkit", "react-redux", "redux-persist"],
          },
        },
      },
    },
  }),
);
