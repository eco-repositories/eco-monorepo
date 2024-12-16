// @ts-check
import globals from "globals"
import configBase from "../../eslint.config.mjs"

export default [
  {
    ignores: ["**/*.snap.ts", "**/*.snap.tsx"],
  },
  ...configBase,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        AudioWorkletGlobalScope: false,
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
