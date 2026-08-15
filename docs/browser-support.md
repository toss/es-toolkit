---
description: The browsers es-toolkit supports out of the box, and how to reach older ones
---

# Browser Support

es-toolkit works out of the box in all browsers released since early 2022:

| Environment | Minimum version |
| ----------- | --------------- |
| Chrome      | 98+             |
| Edge        | 98+             |
| Firefox     | 94+             |
| Safari      | 15.4+           |
| iOS Safari  | 15.4+           |
| Node.js     | 18+             |

es-toolkit makes full use of modern JavaScript to keep its codebase small and efficient.
To support browsers older than the ones above, you can add build configuration. This makes es-toolkit work correctly even in much older browsers that only support ES2015, such as Chrome 51 or Safari 10. See [Supporting older browsers](#supporting-older-browsers) below.

Every es-toolkit release is verified to work correctly in the supported browsers: once statically with ESLint plugins like [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x), and again with real Playwright-based E2E tests.

## Supporting older browsers

With the right bundler configuration, es-toolkit works correctly even in browsers as old as Chrome 51 or Safari 10.
This requires two pieces of configuration.

### 1. Converting modern syntax to older syntax (transpilation)

es-toolkit is published using modern syntax such as optional chaining (`foo?.bar`) and class fields.

Bundlers generally do not transpile dependencies (`node_modules`).
Add the following configuration so that the modern syntax es-toolkit uses is converted to syntax that older browsers also support.

#### Vite

Set [`build.target`](https://vite.dev/config/build-options.html#build-target) to the oldest browsers you want to support:

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite applies `build.target` to every module in the bundle, including es-toolkit, so no further configuration is needed.

#### webpack + Babel

Configure `babel-loader` with `@babel/preset-env`, and make sure the `exclude` pattern does not exclude es-toolkit:

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

### 2. Adding modern runtime JavaScript APIs

es-toolkit makes use of modern JavaScript APIs available in recent browsers and runtimes, such as `Array#at` and `structuredClone`. Older browsers do not implement these functions, so to use es-toolkit you need to fill in the implementations.

Add the polyfills provided by `core-js` as follows:

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

This code must be loaded at your application entrypoint, before es-toolkit is imported.

### Caveats

#### 1. Supporting very old browsers like Chrome 51 or Safari 10 in Vite requires an extra plugin

Vite uses esbuild by default, which does not support very old browsers.
To support them, transpile your source code with Babel using the [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) plugin:

<<< @/../tests/browser-compat/fixtures/vite-legacy/vite.config.mjs{js}

#### 2. `es-toolkit/bigint` is only available in browsers that support BigInt

JavaScript's BigInt is a newly added value type, so it can be neither transpiled nor polyfilled. If you use `es-toolkit/bigint`, you can only support Chrome 67+ and Safari 14+.
