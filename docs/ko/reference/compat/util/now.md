# now (Lodash 호환성)

::: warning `Date.now()`를 사용하세요

이 `now` 함수는 단순히 `Date.now()`를 호출하는 래퍼 함수로 불필요한 추상화예요.

대신 더 빠르고 직접적인 `Date.now()`를 사용하세요.

:::

현재 시간을 밀리초 단위로 반환해요.

```typescript
const currentTime = now();
```

## 사용법

### `now()`

1970년 1월 1일 00:00:00 UTC부터 경과된 밀리초 수를 반환해요. 시간 측정이나 타임스탬프 생성에 유용해요.

```typescript
import { now } from 'es-toolkit/compat';

// 현재 시간을 가져와요
const currentTime = now();
console.log(currentTime); // => 1703925600000 (예시)

// 실행 시간을 측정해요
const startTime = now();
// 시간이 오래 걸리는 작업
const endTime = now();
console.log(`작업 시간: ${endTime - startTime}ms`);

// 타임스탬프로 사용해요
const timestamp = now();
const logMessage = `[${timestamp}] 작업 완료`;
```

`Date.now()`와 동일한 결과를 반환해요.

```typescript
import { now } from 'es-toolkit/compat';

console.log(now() === Date.now()); // => true (같은 시점에 호출되면)
```

#### 파라미터

파라미터는 없어요.

#### 반환 값

(`number`): 1970년 1월 1일 00:00:00 UTC부터 현재까지의 밀리초 수를 반환해요.
