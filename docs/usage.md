---
description: How to use es-toolkit
prev:
  text: Introduction to es-toolkit
  link: ./intro.md
next:
  text: Impact on Bundle Size
  link: ./bundle-size
---

# Installation & Usage

es-toolkit is available via [npm](https://npmjs.com/package/es-toolkit) for Node.js and Bun, and through [JSR](https://jsr.io/@es-toolkit/es-toolkit) for Deno.

You can also use es-toolkit in browsers by [importing them in CDNs](#browsers).

## Node.js

es-toolkit supports Node.js 18 or later. Install es-toolkit with the following command:

::: code-group

```sh [npm]
npm install es-toolkit
```

```sh [pnpm]
pnpm add es-toolkit
```

```sh [yarn]
yarn add es-toolkit
```

:::

## Deno

es-toolkit is also available via [JSR](https://jsr.io/@es-toolkit/es-toolkit) for Deno. To install es-toolkit, use the following command:

```sh
deno add @es-toolkit/es-toolkit
```

Note that the package name includes an additional scope, distinct from npm, as per JSR restrictions.

```typescript
import { sum } from '@es-toolkit/es-toolkit';

sum([1, 2, 3]);
```

## Bun

es-toolkit is also available on Bun. You can install it via the following command:

```sh
bun add es-toolkit
```

## Browsers

You can find es-toolkit on CDNs such as [jsdelivr](https://www.jsdelivr.com), [unpkg](https://unpkg.com). We define `_` to include all functions, similar to Lodash.

::: code-group

```html [jsdelivr]
<script src="https://cdn.jsdelivr.net/npm/es-toolkit@%5E1"></script>
<script>
  var arr = _.chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

```html [unpkg]
<script src="https://unpkg.com/es-toolkit@%5E1"></script>
<script>
  var arr = _.chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

:::

es-toolkit is also available on [esm.sh](https://esm.sh) for modern browsers.

::: code-group

```html [esm.sh]
<script type="importmap">
  {
    "imports": {
      "es-toolkit": "https://esm.sh/es-toolkit@%5E1"
    }
  }
</script>
<script type="module">
  import { chunk } from 'es-toolkit';
  chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

:::
