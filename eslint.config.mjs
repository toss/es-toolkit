import compatPlugin from 'eslint-plugin-compat';
import esXPlugin from 'eslint-plugin-es-x';
import noForOfArrayPlugin from 'eslint-plugin-no-for-of-array';
import prettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';

export default defineConfig(
  globalIgnores([
    '.yarn/**',
    'coverage/**',
    '**/dist/**',
    '**/cache/**',
    '.pnp.*',
    'tests/browser-compat/generated/**',
    'tests/browser-compat/dist-fixtures/**',
    '**/*.d.ts',
    '**/*.tgz',
    'node_modules/**',
    'es-toolkit-plugin/skills/*/docs',
  ]),
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
    settings: { vitest: { typecheck: true } },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-conditional-expect': 'warn',
      'vitest/no-commented-out-tests': 'warn',
      'vitest/valid-expect': 'warn',
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
  // Browser support floor: Chrome 98 / Safari 15.4 (see docs/browser-support.md).
  // These rules ensure new code does not silently raise the minimum supported browsers.
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.spec.ts', 'src/server/**'],
    plugins: {
      'es-x': esXPlugin,
      compat: compatPlugin,
    },
    rules: {
      // ECMAScript features newer than what Chrome 98 / Safari 15.4 support.
      ...esXPlugin.configs['flat/no-new-in-es2022'].rules,
      ...esXPlugin.configs['flat/no-new-in-es2023'].rules,
      ...esXPlugin.configs['flat/no-new-in-es2024'].rules,
      ...esXPlugin.configs['flat/no-new-in-es2025'].rules,
      ...esXPlugin.configs['flat/no-new-in-es2026'].rules,
      // ES2022 features that Chrome 98 / Safari 15.4 already support.
      'es-x/no-arbitrary-module-namespace-names': 'off', // syntax only; erased by bundlers
      'es-x/no-array-prototype-at': 'off', // Chrome 92+ / Safari 15.4+
      'es-x/no-class-instance-fields': 'off', // Chrome 72+ / Safari 14.1+
      'es-x/no-class-private-fields': 'off', // Chrome 74+ / Safari 14.1+
      'es-x/no-class-private-methods': 'off', // Chrome 84+ / Safari 15+
      'es-x/no-class-static-fields': 'off', // Chrome 72+ / Safari 14.1+
      'es-x/no-error-cause': 'off', // Chrome 93+ / Safari 15+
      'es-x/no-object-hasown': 'off', // Chrome 93+ / Safari 15.4+
      'es-x/no-private-in': 'off', // Chrome 91+ / Safari 15+
      'es-x/no-regexp-d-flag': 'off', // Chrome 90+ / Safari 15+
      'es-x/no-string-prototype-at': 'off', // Chrome 92+ / Safari 15.4+
      'es-x/no-top-level-await': 'off', // not applicable to library source
      // ES2023 features that Chrome 98 / Safari 15.4 already support.
      'es-x/no-array-prototype-findlast-findlastindex': 'off', // Chrome 97+ / Safari 15.4+
      // Web APIs (structuredClone etc.) newer than Chrome 98 / Safari 15.4.
      'compat/compat': 'error',
    },
    settings: {
      browsers: ['chrome 98', 'safari 15.4'],
    },
  },
  // es-toolkit/iterator (and its fp variant) intentionally requires runtimes
  // with native ES2025 iterator helpers, so the Iterator floor rules above do
  // not apply to it. Other post-ES2022 features remain forbidden there.
  {
    files: ['src/iterator/**/*.ts', 'src/fp/iterator/**/*.ts'],
    rules: {
      'es-x/no-iterator': 'off',
      'es-x/no-iterator-prototype-drop': 'off',
      'es-x/no-iterator-prototype-every': 'off',
      'es-x/no-iterator-prototype-filter': 'off',
      'es-x/no-iterator-prototype-find': 'off',
      'es-x/no-iterator-prototype-flatmap': 'off',
      'es-x/no-iterator-prototype-foreach': 'off',
      'es-x/no-iterator-prototype-map': 'off',
      'es-x/no-iterator-prototype-reduce': 'off',
      'es-x/no-iterator-prototype-some': 'off',
      'es-x/no-iterator-prototype-take': 'off',
      'es-x/no-iterator-prototype-toarray': 'off',
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
  }
);
