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

이 범위는 전 세계 브라우저 트래픽의 약 98.7%를 커버해요. 빌드 설정을 추가하면 더 아래까지 내려갈 수 있어요.

- **Chrome 80 / Safari 14.1** (2020년 무렵, 약 98.8% 커버): 트랜스파일 + 폴리필 6개. [오래된 브라우저 지원하기](#오래된-브라우저-지원하기)를 참고하세요.
- **Chrome 51 / Safari 10** (ES2015 세대, 약 99.4% 커버): [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 사용, `es-toolkit/bigint` 제외. [ES2015 세대 브라우저](#es2015-세대-브라우저-chrome-51-safari-10)를 참고하세요.

이 지원 범위들은 지속적으로 검증돼요. 모든 변경 사항은 정적 분석([`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x), [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat))으로 검사되고, 문서에 있는 모든 코드 예제로 구성된 전체 테스트 스위트가 실제 Chrome 98, Chrome 80, Chrome 51, WebKit 15.4, WebKit 14.1에서 CI로 실행돼요.

## 왜 이 버전인가요?

es-toolkit은 번들을 작고 빠르게 유지하기 위해 트랜스파일하지 않은 모던 JavaScript를 배포해요. 최소 지원 버전은 내부에서 사용하는 가장 새로운 런타임 API가 결정해요.

| 기능                                         | 사용하는 함수                                  | Chrome | Safari |
| -------------------------------------------- | ---------------------------------------------- | ------ | ------ |
| `??`, `?.`, `BigInt`                         | 전체                                           | 80     | 14     |
| 클래스 필드                                  | `Semaphore`, `Mutex`                           | 72     | 14.1   |
| `AggregateError`                             | `clone`                                        | 85     | 14     |
| `Object.hasOwn`                              | `pick`, `groupBy`, `get` 등 객체/배열 유틸리티 | 93     | 15.4   |
| `Error`의 `cause` 옵션                       | `clone`                                        | 93     | 15     |
| `Array.prototype.at`                         | `nthArg`                                       | 92     | 15.4   |
| `Array.prototype.findLast` / `findLastIndex` | `findLast`, `findLastKey`, `takeRightWhile`    | 97     | 15.4   |
| `structuredClone`                            | `cloneDeepWith`                                | 98     | 15.4   |

저장소의 ESLint 규칙이 Chrome 98 / Safari 15.4보다 새로운 문법이나 API가 추가되면 빌드를 실패시키기 때문에, 이 표는 조용히 어긋날 수 없어요.

## 오래된 브라우저 지원하기

Chrome 80 / Safari 14.1에서 es-toolkit을 실행하려면 두 가지가 필요해요.

1. es-toolkit을 포함한 번들 전체의 **트랜스파일**
2. 위 표에 있는 런타임 API를 위한 **폴리필 6개**

필요한 폴리필은 아주 적어서, `core-js/stable` 전체를 불러올 필요는 없어요.

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

이 파일을 애플리케이션 진입점에서 es-toolkit을 불러오기 **전에** 한 번 불러오세요.

::: warning es-toolkit을 트랜스파일 대상에서 제외하면 안 돼요
빌드 도구는 보통 `node_modules`를 트랜스파일하지 않아요. es-toolkit은 모던 문법으로 배포되므로 반드시 트랜스파일에 **포함**되어야 해요. 아래 Vite 설정은 번들에 포함된 모든 코드를 변환하므로 자동으로 처리되고, webpack + Babel에서는 es-toolkit이 포함되도록 `exclude` 범위를 조정해야 해요.
:::

### Vite

[`build.target`](https://vite.dev/config/build-options.html#build-target)을 지원하려는 가장 오래된 브라우저로 설정하세요.

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite는 `build.target`을 es-toolkit을 포함한 번들의 모든 모듈에 적용하므로 추가 설정이 필요 없어요.

### webpack + Babel

`babel-loader`에 `@babel/preset-env`를 설정하고, `exclude` 패턴이 es-toolkit을 제외하지 않도록 하세요.

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

::: danger `useBuiltIns: 'usage'`는 기본 설정으로는 es-toolkit에 폴리필을 넣지 않아요
`@babel/preset-env`의 `useBuiltIns: 'usage'`는 Babel이 직접 처리한 파일에만 폴리필을 주입해요. 일반적인 `exclude: /node_modules/` 설정에서는 Babel이 es-toolkit의 `Object.hasOwn` 호출을 보지 못해서 폴리필이 주입되지 않아요. 위의 폴리필 파일을 진입점에서 불러오거나(권장), es-toolkit을 `babel-loader` 범위에 포함하세요.
:::

### 오래된 브라우저에서 알려진 동작 차이

- **Chrome 80–92 / Safari 14.1에서는 `clone`이 `Error`의 `cause`를 보존하지 못해요**: 이 엔진들은 `Error` 생성자의 `cause` 옵션을 조용히 무시하는데, 이를 폴리필하려면 전역 `Error` 생성자를 교체해야 해요. 이 브라우저들에서는 복제된 에러에 `cause`가 없어요.

## ES2015 세대 브라우저 (Chrome 51+ / Safari 10+)

전 세계 트래픽의 약 99.4%까지 커버하려면 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)를 사용하세요. Babel로 트랜스파일하기 때문에 — esbuild와 달리 — `words`, `camelCase` 같은 문자열 유틸리티가 쓰는 유니코드 property 정규식까지 변환할 수 있고, 필요한 core-js 폴리필을 자동으로 주입해요.

<<< @/../tests/browser-compat/fixtures/vite-legacy/vite.config.mjs{js}

두 개의 Web API는 core-js 밖에 있어서 `plugin-legacy`가 제공하지 않아요. `structuredClone`과, `debounce`·`delay`가 사용하는 `AbortController`예요. 위의 최소 폴리필 대신 이 파일을 진입점에서 한 번 불러오세요.

<<< @/../tests/browser-compat/polyfills/legacy.mjs{js}

`es-toolkit/bigint` 외에 한 그룹의 함수는 더 높은 하한을 유지해요. `es-toolkit/compat`의 단어 분리 함수들(`words`, `camelCase`, `kebabCase`, `lowerCase`, `snakeCase`, `startCase`, `upperCase`)은 유니코드 property 정규식을 호출 시점에 문자열로 조립하기 때문에 어떤 트랜스파일러도 변환할 수 없어서, 호출하려면 Chrome 64+ / Safari 11.1+가 필요해요. 불러오는 것 자체는 안전하고, 메인 `es-toolkit` 모듈의 동명 함수들은 Babel이 변환할 수 있는 정규식 리터럴을 쓰기 때문에 끝까지 잘 동작해요.

::: warning 이 티어에서는 `es-toolkit/bigint`가 제외돼요
`BigInt`는 ES2015로 표현할 수 없어요. 리터럴은 트랜스파일이 불가능하고 런타임은 폴리필이 불가능해요. 애플리케이션이 `es-toolkit/bigint`를 불러오지 않는 한(그리고 `sum` 같은 함수에 `BigInt` 값을 넘기지 않는 한) bigint 코드는 번들에 들어가지 않아서 레거시 빌드가 잘 동작해요. 그 외 전부 — `es-toolkit`, `es-toolkit/compat`, `es-toolkit/fp` — 는 지원돼요.
:::

::: info 이 티어의 검증 범위
CI는 이 설정 그대로를 실제 Chrome 51에서 실행해요. Safari 10–13은 리눅스 CI에서 자동화할 수 없어서, 이 티어의 Safari 쪽은 직접 실행 대신 Babel/core-js의 변환 보장에 근거해요. WebKit 14.1 레인이 이중 번들의 모던 절반을 검증해요.
:::

## 어떻게 검증되나요?

[`tests/browser-compat`](https://github.com/toss/es-toolkit/tree/main/tests/browser-compat) 스위트는 모든 함수의 JSDoc에서 모든 `@example`을 추출해(1,300개 이상의 케이스) 배포되는 `dist` 파일을 위의 각 설정으로 번들링하고, CI에서 실제 브라우저로 실행해요.

| 설정                         | 브라우저               |
| ---------------------------- | ---------------------- |
| 트랜스파일 없음, 폴리필 없음 | Chrome 98, WebKit 15.4 |
| 위의 Vite 설정               | Chrome 80, WebKit 14.1 |
| 위의 webpack 설정            | Chrome 80, WebKit 14.1 |
| 위의 `plugin-legacy` 설정    | Chrome 51, WebKit 14.1 |

이 페이지에 실린 설정 파일은 CI 스위트가 사용하는 파일 그 자체라서, 문서가 실제 테스트와 어긋날 수 없어요.
