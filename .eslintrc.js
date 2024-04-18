module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          'module',
          '/^shared/',
          '/^features/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};
