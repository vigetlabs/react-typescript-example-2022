module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'import/order': [
          'error',
          {
            groups: [
              'index',
              'sibling',
              'parent',
              'internal',
              'external',
              'builtin',
              'object',
              'type',
            ],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
      settings: {
        'import/ignore': ['react'],
        'import/resolver': {
          typescript: true,
          node: true,
        },
      },
    },
  ],
};
