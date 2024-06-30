---
description: es-toolkit을 설치하는 방법
prev:
  text: es-toolkit 소개
  link: ./intro.md
next:
  text: 번들 사이즈에 미치는 영향
  link: ./bundle-size
---

# 설치

Node.js나 Bun을 사용하는 경우, [npm](https://npmjs.com/package/es-toolkit)에서 설치할 수 있어요. Deno에서는 [JSR](https://jsr.io/es-toolkit)에서 설치할 수 있어요.

## Node.js

es-toolkit은 Node.js 18 또는 이후 버전을 지원해요. es-toolkit을 설치하기 위해서는 아래 명령어를 사용해주세요.

```sh
npm install es-toolkit
yarn add es-toolkit
pnpm install es-toolkit
```

## Deno

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
