import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      pool: "vmThreads",
      setupFiles: "./src/vitest.setup.js",
      css: true,
      alias: [
        { find: /^.+\.css$/, replacement: "identity-obj-proxy" },
        { find: /^.+\.scss$/, replacement: "identity-obj-proxy" },
      ],
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx,js,jsx}"],
        exclude: [
          "src/**/*.test.{ts,tsx,js,jsx}",
          "src/**/*.d.ts",
          "src/vitest.setup.js",
          "src/utils/testUtils.ts",
          "src/utils/WithMockStoreAndRouter.*",
          "src/types/**",
          "src/index.tsx",
          "src/components/Cart/Icons/*",
          "src/utils/**/defaultValues.ts",
          "src/utils/shippingForm/currencies.ts",
        ],
        reporter: ["text", "html"],
      },
    },
  }),
);
