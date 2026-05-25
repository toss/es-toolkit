# es-toolkit/server

`es-toolkit/server`는 Node.js, Deno, Bun처럼 Node.js 호환 API를 제공하는 서버 런타임을 위한 유틸리티 모듈이에요. 프로세스를 실행하거나 터미널 출력에 색상과 스타일을 입히는 것처럼, 간단해 보이지만 매번 직접 구현하기 번거로운 작업을 작은 API로 제공해요.

`es-toolkit`의 다른 모듈처럼 TypeScript 타입을 함께 제공하고, 필요한 기능만 담아 작고 예측 가능한 인터페이스를 유지해요.

```typescript
import { colors, exec } from 'es-toolkit/server';

const result = await exec('git', ['status', '--short'], {
  throwOnNonZeroExitCode: false,
});

if (result.stdout.trim().length === 0) {
  console.log(colors.green('작업 트리가 깨끗해요.'));
} else {
  console.log(colors.yellow(result.stdout.trim()));
}
```

## 사용 환경

`es-toolkit/server`는 `es-toolkit`과 `es-toolkit/compat`와 달리 Node.js 호환 서버 런타임에서만 사용할 수 있어요. 브라우저나 React Native처럼 `node:child_process` 같은 Node.js API를 사용할 수 없는 환경에서는 사용할 수 없어요.

브라우저에서도 동작하는 배열, 객체, 문자열, Promise 유틸리티가 필요하다면 [`es-toolkit`](/ko/intro)을 사용해 주세요. 기존 Lodash 코드를 그대로 옮기는 중이라면 [`es-toolkit/compat`](/ko/compat/intro)을 사용할 수 있어요.
