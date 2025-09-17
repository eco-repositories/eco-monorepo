import globals from "globals"
import configBase from "#utils/eslint/eslint.config.mjs"

export default [
  {
    ignores: [
      "**/*.snap.ts",
      "**/*.snap.tsx",
    ],
  },
  ...configBase,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        AudioWorkletGlobalScope: false,
        ...globals.jest,
      },
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
    rules: {
      indent: "off", // FIXME: enable back when it doesn't give "RangeError: Maximum call stack size exceeded"
    },
  },
]
