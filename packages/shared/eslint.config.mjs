import globals from "globals"
import configBase from "#utils/eslint/eslint.config.mjs"

export default [
  {
    ignores: ["**/*.snap.ts"],
  },
  ...configBase,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
]
