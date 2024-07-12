---
description: 如何安装 es-toolkit
prev:
  text: es-toolkit 简介
  link: ./intro.md
next:
  text: 包体积对比
  link: ./bundle-size
---

# 安装

es-toolkit 可通过 [npm](https://npmjs.com/package/es-toolkit) 安装，适用于 Node.js 和 Bun，也可以通过 [JSR](https://jsr.io/@es-toolkit/es-toolkit) 安装到 Deno。

## Node.js

es-toolkit 支持 Node.js 18及更高版本。使用以下命令安装 es-toolkit：

::: code-group

```sh [npm]
npm install es-toolkit
```

```sh [pnpm]
pnpm install es-toolkit
```

```sh [yarn]
yarn add es-toolkit
```

:::

## Deno

es-toolkit 也可以通过 [JSR](https://jsr.io/@es-toolkit/es-toolkit) 安装到 Deno。使用以下命令安装 es-toolkit：

```sh
deno add @es-toolkit/es-toolkit
```

请注意，根据 JSR 的限制，包名包含额外的作用域，与 npm 不同。

```typescript
import { sum } from '@es-toolkit/es-toolkit';

sum([1, 2, 3]);
```

## Bun

es-toolkit 也支持 Bun。您可以使用以下命令安装它：

```sh
bun add es-toolkit
```
