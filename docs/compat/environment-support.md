---
description: The browsers and Node.js versions es-toolkit/compat supports as published, without transpilation or polyfills
---

# Browser & Node.js Support

`es-toolkit/compat` works as published in any environment that supports ES2015:

| Environment | Minimum version |
| ----------- | --------------- |
| Chrome      | 51+             |
| Edge        | 15+             |
| Firefox     | 54+             |
| Safari      | 10+             |
| iOS Safari  | 10+             |
| Node.js     | 6+              |

No transpilation and no polyfills are needed. You can use `es-toolkit/compat` as-is, without any extra bundler configuration.

This is different from the main `es-toolkit` library, which requires Chrome 98, Safari 15.4, or Node.js 20.12 and later out of the box. See [Browser Support](/browser-support) for details.

This applies to `es-toolkit/compat` and its per-function entry points (`es-toolkit/compat/*`). Every other entry point, such as `es-toolkit` or `es-toolkit/array`, follows the requirements of the main library.

## Why compat supports older environments

`es-toolkit/compat` exists to help you migrate away from lodash. Code that uses lodash often still runs in old environments, such as older Node.js servers or old browsers.
So that you can switch from lodash to `es-toolkit/compat` without changing your build configuration, `es-toolkit/compat` works in those older environments as published.

## How it is verified

Support for these environments is verified on every change, in two ways.

- **Statically with ESLint**: [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) restricts the code of `es-toolkit/compat` to ES2015 syntax and built-ins (optional chaining and `??` are allowed because the build converts them to older syntax), and [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) checks it against a Node.js 6 target.
- **On a real Node.js 6 in CI**: every `es-toolkit/compat/*` entry point of the built package is loaded, and every `@example` of the compat functions is executed.
