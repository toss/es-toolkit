---
description: How to install es-toolkit
prev:
  text: Introduction to es-toolkit
  link: ./intro.md
next:
  text: Impact on Bundle Size
  link: ./bundle-size
---

# Installation

es-toolkit is available via [npm](https://npmjs.com/package/es-toolkit) for Node.js and Bun, and through [JSR](https://jsr.io/@es-toolkit/es-toolkit) for Deno.

## Node.js

es-toolkit supports Node.js 18 or later. Install es-toolkit with the following command:

```sh
npm install es-toolkit
yarn add es-toolkit
pnpm install es-toolkit
```

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
