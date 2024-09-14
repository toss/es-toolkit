---
description: 如何使用 es-toolkit
prev:
  text: es-toolkit 简介
  link: ./intro.md
next:
  text: 包体积对比
  link: ./bundle-size
---

# 使用方法

es-toolkit 可通过 [npm](https://npmjs.com/package/es-toolkit) 安装，适用于 Node.js 和 Bun，也可以通过 [JSR](https://jsr.io/@es-toolkit/es-toolkit) 安装到 Deno。

你也可以通过 [从 CDN 导入](#浏览器) 的方式在浏览器中使用 es-toolkit。

## Node.js

es-toolkit 支持 Node.js 18及更高版本。使用以下命令安装 es-toolkit：

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

## 浏览器

你可以在诸如[jsdelivr](https://www.jsdelivr.com)或[unpkg](https://unpkg.com)等CDN上找到es-toolkit。我们将 `_` 定义为包含所有函数，类似于 Lodash。

::: code-group

```html [jsdelivr]
<script src="https://cdn.jsdelivr.net/npm/es-toolkit"></script>
<script>
  var arr = _.chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

```html [unpkg]
<script src="https://unpkg.com/es-toolkit"></script>
<script>
  var arr = _.chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

:::

es-toolkit 也可在 [esm.sh](https://esm.sh) 上为现代浏览器提供。

::: code-group

```html [esm.sh]
<script type="importmap">
  {
    "imports": {
      "es-toolkit": "https://esm.sh/es-toolkit"
    }
  }
</script>
<script type="module">
  import { chunk } from 'es-toolkit';
  chunk([1, 2, 3, 4, 5, 6], 3);
</script>
```

:::
