import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize compatibility helper
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
  {
    ignores: ["**/dist/**", "node_modules/", "coverage/", "eslint.config.js"],
  },

  // 1. Emulate your previous "extends" list
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("airbnb"),
  ...compat.extends("airbnb-typescript"),
  ...compat.extends("plugin:import/typescript"),

  // 2. Main Application Logic
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/lines-between-class-members": "off",
      "@typescript-eslint/no-throw-literal": "off",
      quotes: ["error", "double", { avoidEscape: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "warn",
      "@typescript-eslint/no-shadow": "error",
      // Airbnb is strict about extensions, you might need this:
      "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
          packageDir: "./",
        },
      ],
      "import/extensions": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // 3. Test Overrides
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.test.js", "**/*.test.jsx"],
    plugins: {
      "testing-library": testingLibrary,
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "testing-library/no-node-access": [
        "error",
        { allowContainerFirstChild: true },
      ],
      "import/first": "off",
    },
  },

  // 4. Prettier (Must be last to override Airbnb's formatting rules)
  prettier,
);
