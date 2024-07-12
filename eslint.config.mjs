import eslint from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginReactConfig from "eslint-plugin-react/configs/jsx-runtime.js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  { ignores: ["**/build", "**/cdk.out"] },
  {
    name: "globals",
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    name: "react",
    files: ["**/*.{jsx,tsx}"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    ...pluginReactConfig,
  },
  {
    name: "base",
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: pluginImport,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
    },
  },
];
