---
description: es-toolkitの使用方法
prev:
  text: es-toolkitの紹介
  link: ./intro.md
next:
  text: バンドルサイズへの影響
  link: ./bundle-size
---

# インストールと使用方法

Node.jsやBunを使用する場合は、[npm](https://npmjs.com/package/es-toolkit)からインストールできます。Denoでは[JSR](https://jsr.io/@es-toolkit/es-toolkit)からインストールできます。

ブラウザで直接使用する場合は、[CDNから取得](#ブラウザ)できます。

## Node.js

es-toolkitはNode.js 18以降のバージョンをサポートしています。es-toolkitをインストールするには、以下のコマンドを使用してください。

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

es-toolkitはDenoでも使用できます。[JSR](https://jsr.io/@es-toolkit/es-toolkit)から以下のコマンドでインストールしてください。

```sh
deno add @es-toolkit/es-toolkit
```

Denoで使用する場合、JSRの制限により、NPMとは異なり追加のスコープが必要です。

```typescript
import { sum } from '@es-toolkit/es-toolkit';

sum([1, 2, 3]);
```

## Bun

es-toolkitはBunでも使用できます。以下のコマンドを使用してください。

```sh
bun add es-toolkit
```

## ブラウザ

[jsdelivr](https://www.jsdelivr.com)や[unpkg](https://unpkg.com)などのCDNからes-toolkitを使用できます。Lodashと同様に、`_`変数にすべての関数が含まれています。

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

モダンなブラウザでは[esm.sh](https://esm.sh)も使用できます。

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
