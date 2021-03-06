module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: {
    semi: ['error', 'always'],
    curly: ['error', 'multi-line', 'consistent'],
    eqeqeq: ['error', 'always'],
    quotes: [
      'error',
      'double',
      {
        allowTemplateLiterals: true,
      },
    ],
  },
}
