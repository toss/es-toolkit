# overEvery (Lodash 호환성)

::: warning `Array.every`를 사용하세요

이 `overEvery` 함수는 내부 `iteratee` 함수 변환이나 복잡한 배열 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.every`를 사용하세요.

:::

주어진 모든 조건 함수들이 값에 대해 참을 반환하는지 확인하는 함수를 만들어요.

```typescript
const checker = overEvery(predicate1, predicate2);
```

## 레퍼런스

### `overEvery(...predicates)`

여러 조건 함수를 모두 만족하는지 확인하는 새로운 함수를 만들고 싶을 때 `overEvery`를 사용하세요. 모든 조건 함수가 참을 반환해야만 결과가 `true`가 돼요.

```typescript
import { overEvery } from 'es-toolkit/compat';

// 문자열이면서 길이가 3보다 큰지 확인
const isStringAndLong = overEvery(
  (value) => typeof value === 'string',
  (value) => value.length > 3
);

isStringAndLong("hello"); // true (문자열이고 길이가 3보다 큼)
isStringAndLong("hi"); // false (문자열이지만 길이가 3 이하)
isStringAndLong(42); // false (문자열이 아님)

// 배열로 조건 함수들을 전달할 수도 있어요
const checker = overEvery([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

checker({ a: 1, b: 2 }); // true (a와 b 모두 0보다 큼)
checker({ a: 0, b: 2 }); // false (a가 0이므로 조건 불만족)

// 여러 인자를 받는 함수들도 사용할 수 있어요
const multiArgChecker = overEvery(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a.length > 3 && b.length > 3
);

multiArgChecker("hello", "world"); // true
multiArgChecker("hi", "world"); // false
multiArgChecker(1, 10); // false
```

#### 파라미터

- `predicates` (`...Array<((...args: any[]) => boolean) | ReadonlyArray<(...args: any[]) => boolean>>`): 조건 함수 또는 조건 함수 배열들이에요. 각 조건 함수는 하나 이상의 값을 받아서 참/거짓을 반환해요.

### 반환 값

(`(...args: any[]) => boolean`): 값들을 받아서 모든 조건 함수가 참을 반환하면 `true`, 하나라도 거짓이면 `false`를 반환하는 함수를 반환해요.