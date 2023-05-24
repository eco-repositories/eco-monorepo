const { resolve } = require("path");

module.exports = {
  extends: [
    resolve(__dirname, "../..", ".eslintrc.base.cjs")
  ],
  env: {
    browser: true,
  },
  parserOptions: {
    project: [
      resolve(__dirname, "tsconfig.json"),
      resolve(__dirname, "tsconfig.external.json"),
    ],
  },
};
