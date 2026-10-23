---
description: es-toolkit/compat이 트랜스파일이나 폴리필 없이 배포된 그대로 지원하는 브라우저와 Node.js 버전
---

# 브라우저 및 Node.js 지원

`es-toolkit/compat`은 ES2015를 지원하는 모든 환경에서 배포된 그대로 동작해요.

| 환경       | 최소 버전 |
| ---------- | --------- |
| Chrome     | 51+       |
| Edge       | 15+       |
| Firefox    | 54+       |
| Safari     | 10+       |
| iOS Safari | 10+       |
| Node.js    | 6+        |

트랜스파일이나 폴리필이 필요 없어요. 번들러 설정을 추가하지 않아도 `es-toolkit/compat`을 그대로 사용할 수 있어요.

메인 라이브러리인 `es-toolkit`은 별도 설정 없이 사용하려면 Chrome 98, Safari 15.4, Node.js 20.12 이상이 필요한 것과 달라요. 자세한 내용은 [브라우저 지원](/ko/browser-support)을 참고하세요.

이 지원 범위는 `es-toolkit/compat`과 함수별 진입점(`es-toolkit/compat/*`)에만 적용돼요. `es-toolkit`, `es-toolkit/array` 같은 다른 진입점은 메인 라이브러리의 요구 사항을 따라요.

## 오래된 환경을 지원하는 이유

`es-toolkit/compat`은 lodash에서 벗어나 마이그레이션할 수 있도록 돕기 위해 존재해요. lodash를 사용하는 코드는 오래된 Node.js 서버나 오래된 브라우저처럼 여전히 오래된 환경에서 실행되는 경우가 많아요.
그래서 빌드 설정을 바꾸지 않고도 lodash를 `es-toolkit/compat`으로 교체할 수 있도록, `es-toolkit/compat`은 배포된 그대로 오래된 환경에서 동작해요.

## 검증 방법

이 환경들에 대한 지원은 변경이 있을 때마다 두 가지 방법으로 검증하고 있어요.

- **ESLint로 정적 검증**: [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x)로 `es-toolkit/compat`의 코드가 ES2015 문법과 내장 기능만 사용하도록 제한하고(옵셔널 체이닝과 `??`는 빌드 과정에서 오래된 문법으로 변환되기 때문에 허용해요), [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat)으로 Node.js 6을 대상으로 검사해요.
- **CI에서 실제 Node.js 6으로 검증**: 빌드된 패키지의 모든 `es-toolkit/compat/*` 진입점을 불러오고, compat 함수의 모든 `@example`을 실행해요.
