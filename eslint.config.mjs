import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import react from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/RemixApp/build", "**/**/node_modules", "**/**/cdk.out"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(reactRecommended),
  ...fixupConfigRules(react),
];
