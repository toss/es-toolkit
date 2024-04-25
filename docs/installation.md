---
description: How to install es-toolkit
prev:
  text: Introduction to es-toolkit
  link: ./intro.md
next:
  text: Impact on Bundle Size
  link: ./bundle-size
---
Installation
============

es-toolkit is available on [npm](https://npmjs.com/package/es-toolkit) for Node.js, Deno, and Bun.


Node.js
---
es-toolkit supports Node.js 18 or later. Install es-toolkit with the following command:

```sh
npm install es-toolkit
yarn add es-toolkit
pnpm install es-toolkit
```


Deno
----

es-toolkit is also available on npm for Deno. Use es-toolkit with the `npm:` specifier:

```typescript
import { chunk } from 'npm:es-toolkit@1.0.0';
```


Bun
---

es-toolkit is also available on Bun. You can install it via the following command:

```sh
bun add es-toolkit
```