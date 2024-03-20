module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'vue/jsx-uses-vars': 2,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: false,
      },
    ],
    'vue/no-side-effects-in-computed-properties': ['off'],
    'vue/prefer-import-from-vue': 'off',
    semi: ['error', 'always'],
  },
}
