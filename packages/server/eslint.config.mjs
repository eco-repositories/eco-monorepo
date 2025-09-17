import globals from "globals"
import configBase from "../../eslint.config.mjs"

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
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
]
