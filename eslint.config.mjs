import noForOfArrayPlugin from 'eslint-plugin-no-for-of-array';
import prettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';

export default [
  {
    ignores: [
      '.yarn/**',
      'coverage/**',
      '**/dist/**',
      '**/cache/**',
      '.pnp.*',
      '**/*.d.ts',
      '**/*.tgz',
      'node_modules/**',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        ...globals['shared-node-browser'],
        ...globals.es2015,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.spec.ts*'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-commented-out-tests': 'warn',
      'vitest/expect-expect': 'warn',
      'vitest/valid-expect': 'warn',
      'vitest/no-identical-title': 'warn',
      'vitest/valid-title': 'warn',
    },
  },
  prettier,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.spec.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'no-for-of-array': noForOfArrayPlugin,
    },
    rules: {
      'no-for-of-array/no-for-of-array': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.object.name="console"]',
          message: 'console.log() is not allowed in source code.',
        },
        {
          selector: 'CallExpression[callee.object.name="Object"][callee.property.name="entries"]',
          message:
            'Do not use Object.entries for performance. Consider using alternatives like Object.keys() or Object.values().',
        },
      ],
    },
  },
  {
    rules: {
      'no-implicit-coercion': 'error',
      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'anywhere',
        },
      ],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['camelCase', 'UPPER_CASE', 'PascalCase'], selector: 'variable', leadingUnderscore: 'allow' },
        { format: ['camelCase', 'PascalCase'], selector: 'function' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, caughtErrors: 'none' }],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'private-static-field',
            'public-instance-field',
            'private-instance-field',
            'public-constructor',
            'private-constructor',
            'public-instance-method',
            'private-instance-method',
          ],
        },
      ],
      'vue/multi-word-component-names': 'off',
      'prefer-object-has-own': 'error',
    },
  },
];
