import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import {
  commonTypeScriptRules,
  nodeRuntimeGlobals,
  testGlobals,
  typescriptNoUndefOffRule,
} from "../eslint.shared.js";

const commonGlobals = {
  ...nodeRuntimeGlobals,
  ...testGlobals,
  jest: "readonly",
};

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "prisma/**",
      "src/generated/prisma/**",
      "uploads/**",
      "scripts/**",
      "data/**",
      "debug_blocks.*",
      "src/scripts/**",
      "src/migrations/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: commonGlobals,
    },
    rules: {
      "no-console": "off",
      "no-empty": ["error"],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: commonGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...commonTypeScriptRules,
      ...typescriptNoUndefOffRule,
      "no-console": "off",
      "no-empty": ["error"],
    },
  },
  prettier,
];
