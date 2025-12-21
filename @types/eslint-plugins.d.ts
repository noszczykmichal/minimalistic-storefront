declare module "eslint-plugin-react" {
  import { Linter } from "eslint";

  const plugin: {
    configs: {
      recommended: Linter.Config;
      all: Linter.Config;
      "jsx-runtime": Linter.Config;
    };
    rules: Record<string, any>;
  };
  export default plugin;
}

declare module "eslint-plugin-react-hooks" {
  import { Linter } from "eslint";

  const plugin: {
    configs: {
      recommended: Linter.Config;
    };
    rules: Record<string, any>;
  };
  export default plugin;
}

declare module "eslint-plugin-testing-library";
