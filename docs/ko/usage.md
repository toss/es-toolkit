---
description: es-toolkit을 사용하는 방법
prev:
  text: es-toolkit 소개
  link: ./intro.md
next:
  text: 번들 사이즈에 미치는 영향
  link: ./bundle-size
---

# 설치 및 사용하기

Node.js나 Bun을 사용하는 경우, [npm](https://npmjs.com/package/es-toolkit)에서 설치할 수 있어요. Deno에서는 [JSR](https://jsr.io/@es-toolkit/es-toolkit)에서 설치할 수 있어요.

브라우저에서 바로 쓰는 경우, [CDN에서 가져올 수](#브라우저) 있어요.

## Node.js

es-toolkit은 Node.js 18 또는 이후 버전을 지원해요. es-toolkit을 설치하기 위해서는 아래 명령어를 사용해주세요.

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

es-toolkit을 Deno에서도 사용할 수 있어요. [JSR](https://jsr.io/@es-toolkit/es-toolkit)에서 아래 명령어로 설치하세요.

```sh
deno add @es-toolkit/es-toolkit
```

Deno에서 사용하면, JSR에서의 제한으로 인해 NPM과 다르게 추가적인 Scope가 필요해요.

```typescript
import { sum } from '@es-toolkit/es-toolkit';

sum([1, 2, 3]);
```

## Bun

es-toolkit은 Bun에서도 사용할 수 있어요. 아래 명령어를 사용해주세요.

```sh
bun add es-toolkit
```

## 브라우저

[jsdelivr](https://www.jsdelivr.com) 또는 [unpkg](https://unpkg.com) 같은 CDN에서 es-toolkit을 쓸 수 있어요. Lodash와 같이 `_` 변수에 모든 함수가 포함돼요.

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

현대적인 브라우저에서는 [esm.sh](https://esm.sh)도 쓸 수 있어요.

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
