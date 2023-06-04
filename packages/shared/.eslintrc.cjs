const { resolve } = require("path")

module.exports = {
  extends: [
    resolve(__dirname, "../..", ".eslintrc.base.cjs")
  ],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '*.snap.ts',
  ],
  parserOptions: {
    project: [
      resolve(__dirname, "tsconfig.json"),
    ],
  },
}
