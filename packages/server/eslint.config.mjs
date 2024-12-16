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

      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: [
          "./tsconfig.json",
          "./tsconfig.external.json",
        ],
      },
    },
  },
]
