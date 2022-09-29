module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'coverage'],
  extends: ['eslint:recommended'],
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'airbnb-typescript/base',
      ],
      rules: {
        'arrow-body-style': 'off',
        'no-console': 0,
        'prefer-arrow-callback': 'off',
        'import/prefer-default-export': 0,
        'import/named': 2,
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
        'lines-between-class-members': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: false,
          },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        'boundaries/entry-point': 'off',
        // 'boundaries/element-types': [
        //   2,
        //   {
        //     default: 'disallow',
        //     rules: [],
        //   },
        // ],
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.d.ts'],
        },
        'import/resolver': {
          typescript: {
            project: 'tsconfig.json',
            alwaysTryTypes: true,
          },
        },
      },
    },
    {
      files: ['*'], // Post shared rules
      extends: ['prettier'],
      rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-warning-comments': ['warn', { location: 'anywhere' }],
        'capitalized-comments': ['warn', 'always', { ignorePattern: 'prettier-ignore' }],
        'no-unreachable': 'error',
        'sort-imports': ['error', { ignoreDeclarationSort: true }],
        'padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: [
              'class',
              'return',
              'continue',
              'break',
              'throw',
              'multiline-expression',
              'block-like',
              'function',
              'iife',
              'export',
            ],
          },
          {
            blankLine: 'always',
            prev: ['multiline-expression', 'block-like', 'function', 'iife', 'class', 'export'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['import'],
            next: ['import'],
          },
          {
            blankLine: 'any',
            prev: ['export'],
            next: ['export'],
          },
        ],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/extensions': ['error', 'never'],
        'import/order': [
          'error',
          {
            warnOnUnassignedImports: true,
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
            },
            groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index']],
          },
        ],
        eqeqeq: 'error',
        'max-classes-per-file': 'off',
        'no-underscore-dangle': 'off',
        'no-continue': 'off',
        'no-restricted-syntax': 'off',
        'class-methods-use-this': 'off',
        'guard-for-in': 'off',
        'no-await-in-loop': 'off',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'lines-between-class-members': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
