---
description: es-toolkit이 기본으로 지원하는 브라우저 범위와, 더 오래된 브라우저를 지원하는 방법
---

# 브라우저 지원

es-toolkit은 2022년 초 이후 출시된 모든 브라우저에서 별도 설정 없이 동작해요.

| 환경       | 최소 버전 |
| ---------- | --------- |
| Chrome     | 98+       |
| Edge       | 98+       |
| Firefox    | 94+       |
| Safari     | 15.4+     |
| iOS Safari | 15.4+     |
| Node.js    | 20.12+    |

es-toolkit은 현대적인 JavaScript를 적극적으로 활용해서 작고 효율적인 코드베이스를 유지하고 있어요.
그래서 위 표보다 오래된 브라우저를 지원하려면 빌드 설정을 추가해야 해요. 설정을 추가하면 Chrome 51이나 Safari 10처럼 ES2015만 지원하는 브라우저에서도 올바르게 동작해요. 자세한 방법은 아래 [오래된 브라우저 지원하기](#오래된-브라우저-지원하기)를 참고하세요.

es-toolkit은 새 버전을 릴리스할 때마다 지원하는 브라우저에서 올바르게 동작하는지 검증하고 있어요. 먼저 [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) 같은 ESLint 플러그인으로 정적으로 검증하고, 실제 브라우저에서 Playwright 기반 E2E 테스트를 실행해 다시 한번 검증해요.

## 오래된 브라우저 지원하기

번들러를 올바르게 설정하면 es-toolkit을 Chrome 51이나 Safari 10처럼 오래된 브라우저에서도 사용할 수 있어요.
이를 위해서는 두 가지 설정이 필요해요.

### 1. 최신 문법을 오래된 문법으로 바꾸기 (트랜스파일)

es-toolkit은 Optional Chaining(`foo?.bar`)이나 클래스 필드 같은 최신 문법을 그대로 사용해서 배포돼요.

그런데 번들러는 일반적으로 의존성(`node_modules`)을 트랜스파일하지 않아요.
그래서 es-toolkit이 사용하는 최신 문법을 오래된 브라우저에서도 지원되는 문법으로 바꾸도록, 다음 설정을 추가해 주세요.

#### Vite

[`build.target`](https://vite.dev/config/build-options.html#build-target)을 지원하려는 가장 오래된 브라우저로 설정하세요.

```js
import { defineConfig } from 'vite';

export default defineConfig({
  // ... 다른 설정 ...
  build: {
    target: ['chrome80', 'safari14.1'], // [!code highlight]
  },
});
```

Vite는 `build.target`을 es-toolkit을 포함한 번들의 모든 모듈에 적용하기 때문에, 다른 설정은 필요 없어요.

#### Webpack + Babel

`babel-loader`에 `@babel/preset-env`를 설정하고, `exclude` 패턴이 es-toolkit을 제외하지 않도록 하세요.

```js
export default {
  // ... 다른 설정 ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules[\\/](?!es-toolkit)/, // [!code highlight]
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { chrome: '80', safari: '14.1' } }], // [!code highlight]
            ],
          },
        },
      },
    ],
  },
};
```

### 2. 최신 런타임 JavaScript API 채우기 (폴리필)

es-toolkit은 `Array#at`이나 `structuredClone`처럼 최신 브라우저와 런타임이 제공하는 JavaScript API도 활용하고 있어요. 오래된 브라우저에는 이런 API의 구현이 없기 때문에, es-toolkit을 사용하려면 구현을 채워 넣어야 해요.

다음과 같이 `core-js`가 제공하는 폴리필을 추가해 주세요.

```js
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'core-js/actual/aggregate-error';
import 'core-js/actual/array/at';
import 'core-js/actual/array/find-last';
import 'core-js/actual/array/find-last-index';
import 'core-js/actual/object/has-own';
import structuredCloneShim from '@ungap/structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = structuredCloneShim;
}
```

이 코드는 애플리케이션 진입점에서 es-toolkit을 불러오기 전에 실행되어야 해요.

### 주의하기

#### 1. Vite에서 Chrome 51, Safari 10 같은 오래된 브라우저를 지원하려면 추가 플러그인이 필요해요

Vite는 기본적으로 esbuild로 트랜스파일하는데, esbuild는 아주 오래된 브라우저까지는 지원하지 않아요.
아주 오래된 브라우저를 지원하려면, 다음과 같이 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 플러그인을 사용해서 소스 코드를 Babel로 트랜스파일하세요.

```js{2,7-9}
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // ... 다른 설정 ...
  plugins: [
    legacy({
      targets: ['chrome >= 51', 'safari >= 10', 'ios_saf >= 10', 'firefox >= 54', 'edge >= 15'],
    }),
  ],
});
```

#### 2. `es-toolkit/bigint`는 BigInt를 지원하는 브라우저에서만 사용할 수 있어요

JavaScript의 BigInt는 새로 추가된 값 타입이라서 트랜스파일할 수도, 폴리필을 추가할 수도 없어요. 그래서 `es-toolkit/bigint`를 사용한다면 Chrome 67 이상, Safari 14 이상의 브라우저만 지원할 수 있어요.
