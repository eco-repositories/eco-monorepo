// @ts-check
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintJs from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const compat = new FlatCompat({
    baseDirectory: dirPath,
    recommendedConfig: eslintJs.configs.recommended,
    allConfig: eslintJs.configs.all,
});

export default [{
    ignores: ["**/node_modules", "**/dist", "**/.eslintrc.*"],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "love"), {
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
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        indent: "off",

        "@typescript-eslint/indent": ["error", 2, {
            SwitchCase: 1,
            flatTernaryExpressions: false,

            ignoredNodes: [
                "PropertyDefinition[decorators]",
                "TSUnionType",
                "FunctionExpression[params]:has(Identifier[decorators])",
            ],
        }],

        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/restrict-template-expressions": "off", // FIXME: the rule seems to be broken
        semi: "off",
        "space-before-function-paren": "off",
        "@typescript-eslint/no-throw-literal": "off", // FIXME: the rule doesn't go outside of the file to check the base class
    },
}];
