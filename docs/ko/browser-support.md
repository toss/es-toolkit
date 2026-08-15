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
| Node.js    | 18+       |

es-toolkit은 현대적인 JavaScript를 적극적으로 사용하며 작고 효율적인 코드베이스를 유지하고 있어요. 
위 브라우저보다 더 오래된 버전의 브라우저를 지원하려면, 빌드 설정을 추가할 수 있어요. Chrome 51이나 Safari 10처럼 ES2015만을 지원하는 더 오래된 브라우저에서도 올바르게 동작하게 할 수 있어요. 아래 [#오래된-브라우저-지원하기]를 참조하세요.

es-toolkit의 새 버전을 릴리스할 때마다 지원하는 브라우저에서 올바르게 동작하는지 검증하고 있어요. [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) 같은 ESLint 플러그인으로 한 차례 정적으로 검증하고, 실제 Playwright 기반 E2E 테스트로 다시 검증하고 있어요.

## 오래된 브라우저 지원하기

번들러를 올바르게 설정하면 es-toolkit이 Chrome 51이나 Safari 10처럼 오래된 브라우저에서도 올바르게 동작해요. 
이를 위해서는 2가지 설정이 필요해요.

### 1. 최신 문법을 오래된 문법으로 바꾸기 (트랜스파일)

es-toolkit은 Optional Chaining (`foo?.bar`), 클래스 필드와 같은 최신 문법을 적극적으로 사용한 상태로 배포돼요. 

번들러는 일반적으로 의존성(`node_modules`)를 트랜스파일하지 않아요. 
그래서 es-toolkit에서 사용하는 최신 문법을 오래된 브라우저에서도 지원되는 문법으로 바꾸는 다음 설정을 추가해 주세요.

#### Vite

[`build.target`](https://vite.dev/config/build-options.html#build-target)을 지원하려는 가장 오래된 브라우저로 설정하세요.

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite는 `build.target`을 es-toolkit을 포함한 번들의 모든 모듈에 적용하므로 추가 설정이 필요 없어요.

#### webpack + Babel

`babel-loader`에 `@babel/preset-env`를 설정하고, `exclude` 패턴이 es-toolkit을 제외하지 않도록 하세요.

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

### 2. 최신 런타임 JavaScript API 추가하기

es-toolkit은 `Array#at`이나 `structuredClone` 같이 최신 브라우저나 런타임에서 지원되는 현대적인 JavaScript API를 활용하고 있어요. 오래된 브라우저에서는 이런 함수에 대한 구현이 없어서 es-toolkit을 사용하려면 함수 구현을 채워 주어야 해요.

다음과 같이 `core-js` 에서 제공하는 폴리필을 추가해 주세요.

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

이 코드는 애플리케이션 진입점에서 es-toolkit을 불러오기 전에 로드되어야 해요.

### 주의하기

#### 1. Vite에서 Chrome 51, Safari 10과 같은 오래된 브라우저를 지원하려면 추가 플러그인이 필요해요

Vite는 기본적으로 ESBuild를 사용하고 있는데, 아주 오래된 브라우저까지 지원하지 않아요.
아주 오래된 브라우저를 지원하려면 다음과 같이 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 플러그인을 사용해서 소스코드를 Babel로 트랜스파일해야 해요.

<<< @/../tests/browser-compat/fixtures/vite-legacy/vite.config.mjs{js}

#### 2. `es-toolkit/bigint` 는 BigInt를 지원하는 브라우저에서만 사용할 수 있어요

JavaScript의 BigInt는 새로 추가된 값 타입이기 때문에 트랜스파일하거나 폴리필을 추가할 수 없어요. `es-toolkit/bigint` 를 사용한다면 Chrome 67 이상, Safari 14 이상의 브라우저만 지원할 수 있어요.
