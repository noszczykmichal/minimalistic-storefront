import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";
import globals from "globals";

export default tseslint.config(
  // 1. Ignores must be a standalone object
  {
    ignores: ["**/dist/**", "node_modules/", "coverage/"],
  },

  // 2. Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Main Application Logic
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
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      quotes: ["error", "double", { avoidEscape: true }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "warn",
      "@typescript-eslint/no-shadow": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // 4. Test Overrides
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.test.js", "**/*.test.jsx"],
    plugins: {
      "testing-library": testingLibrary,
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals, // This injects describe, test, expect, etc.
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

  // 5. Prettier must stay last
  prettier,
);
