module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '.eslintrc.*',
  ],
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      'SwitchCase': 1,
      'flatTernaryExpressions': false,
      'ignoredNodes': [
        'PropertyDefinition[decorators]',
        'TSUnionType',
        'FunctionExpression[params]:has(Identifier[decorators])',
      ],
    }],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off', // FIXME: the rule seems to be broken

    'semi': 'off',
    'space-before-function-paren': 'off',

    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { 'avoidEscape': true }],
  },
}
