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

es-toolkit은 Deno도 지원해요. `npm:`을 이용해서 사용하세요.

```typescript
import { chunk } from 'npm:es-toolkit@1.0.0';
```

## Bun

es-toolkit은 Bun에서도 사용할 수 있어요. 아래 명령어를 사용해주세요.

```sh
bun add es-toolkit
```
