import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const packageRootDir = dirname(fileURLToPath(import.meta.url))
const compat = new FlatCompat({
  baseDirectory: packageRootDir,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ["**/node_modules", "**/dist"],
  },
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    rules: {
      "comma-dangle": ["error", "always-multiline"],

      indent: ["error", 2, {
        SwitchCase: 1,
        flatTernaryExpressions: false,

        ignoredNodes: [
          "PropertyDefinition[decorators]",
          "TSUnionType",
          "FunctionExpression[params]:has(Identifier[decorators])",
        ],
      }],

      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-throw-literal": "off",
      semi: "off",
      "space-before-function-paren": "off",
    },
  }]
