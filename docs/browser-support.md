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

This range covers about 96% of global browser traffic. With a small amount of build configuration and a handful of polyfills, you can extend support down to **Chrome 80 / Safari 14.1** (2020-era browsers) — see [Supporting older browsers](#supporting-older-browsers) below.

Both ranges are continuously verified: every change is checked against these targets with static analysis ([`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) and [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat)), and the full test suite — every code example in the documentation — runs in real Chrome 98, Chrome 80, WebKit 15.4, and WebKit 14.1 builds in CI.

## Why these versions?

es-toolkit ships modern JavaScript without transpilation, keeping the bundle small and fast. The minimum versions are determined by the newest runtime APIs it uses:

| Feature                                      | Used by                                                    | Chrome | Safari |
| -------------------------------------------- | ---------------------------------------------------------- | ------ | ------ |
| `??`, `?.`, `BigInt`                         | everywhere                                                 | 80     | 14     |
| Class fields                                 | `Semaphore`, `Mutex`                                       | 72     | 14.1   |
| `AggregateError`                             | `clone`                                                    | 85     | 14     |
| `Object.hasOwn`                              | `pick`, `groupBy`, `get`, and other object/array utilities | 93     | 15.4   |
| `Error` `cause` option                       | `clone`                                                    | 93     | 15     |
| `Array.prototype.at`                         | `nthArg`                                                   | 92     | 15.4   |
| `Array.prototype.findLast` / `findLastIndex` | `findLast`, `findLastKey`, `takeRightWhile`                | 97     | 15.4   |
| `structuredClone`                            | `cloneDeepWith`                                            | 98     | 15.4   |

ESLint rules in this repository fail the build if a change introduces syntax or APIs newer than Chrome 98 / Safari 15.4, so this table cannot silently drift.

## Supporting older browsers

To run es-toolkit on Chrome 80 / Safari 14.1, you need two things:

1. **Transpilation** of your bundle (including es-toolkit) down to your targets.
2. **Six polyfills** for the runtime APIs listed above.

The polyfill set is small — a full `core-js/stable` import is not necessary:

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

Import this file once at your application entrypoint, **before** any es-toolkit import.

::: warning es-toolkit must not be excluded from transpilation
Build tools often skip `node_modules` when transpiling. es-toolkit ships modern syntax, so it must be **included**. The Vite setup below handles this automatically (Vite transforms all bundled code); for webpack + Babel, scope your `exclude` so es-toolkit stays included.
:::

### Vite

Set [`build.target`](https://vite.dev/config/build-options.html#build-target) to your oldest browsers:

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite applies `build.target` to every bundled module, including es-toolkit, so no further configuration is needed.

### webpack + Babel

Configure `babel-loader` with `@babel/preset-env` and make sure the `exclude` pattern does not exclude es-toolkit:

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

::: danger `useBuiltIns: 'usage'` does not polyfill es-toolkit by default
`@babel/preset-env`'s `useBuiltIns: 'usage'` only injects polyfills into files that Babel itself processed. With the usual `exclude: /node_modules/`, Babel never sees es-toolkit's `Object.hasOwn` call, and no polyfill is injected. Either import the polyfill file above at your entrypoint (recommended), or include es-toolkit in your `babel-loader` scope.
:::

### Known behavior differences in older browsers

- **`Error` `cause` is not preserved by `clone` in Chrome 80–92 / Safari 14.1**: the `cause` option of the `Error` constructor is silently ignored by these engines, and polyfilling it would require replacing the global `Error` constructor. Cloned errors simply lack `cause` there.

## How this is verified

The [`tests/browser-compat`](https://github.com/toss/es-toolkit/tree/main/tests/browser-compat) suite extracts every `@example` from the JSDoc of every function (1,300+ cases), bundles the published `dist` files with each of the setups above, and runs them in real browsers in CI:

| Setup                          | Browsers               |
| ------------------------------ | ---------------------- |
| No transpilation, no polyfills | Chrome 98, WebKit 15.4 |
| Vite setup above               | Chrome 80, WebKit 14.1 |
| webpack setup above            | Chrome 80, WebKit 14.1 |

The configuration files shown on this page are the exact files used by the CI suite, so the documentation cannot drift from what is actually tested.
