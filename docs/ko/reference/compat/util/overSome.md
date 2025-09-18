# overSome (Lodash 호환성)

::: warning `Array.some`을 사용하세요

이 `overSome` 함수는 내부 `iteratee` 함수 변환이나 복잡한 배열 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.some`을 사용하세요.

:::

주어진 조건 함수들 중 하나라도 값에 대해 참을 반환하는지 확인하는 함수를 만들어요.

```typescript
const checker = overSome(predicate1, predicate2);
```

## 레퍼런스

### `overSome(...predicates)`

여러 조건 함수 중 하나라도 만족하는지 확인하는 새로운 함수를 만들고 싶을 때 `overSome`을 사용하세요. 어떤 조건 함수든 하나만 참을 반환하면 결과가 `true`가 돼요.

```typescript
import { overSome } from 'es-toolkit/compat';

// 문자열이거나 숫자이거나 심볼인지 확인
const isBasicType = overSome(
  (value) => typeof value === 'string',
  (value) => typeof value === 'number',
  (value) => typeof value === 'symbol'
);

isBasicType("hello"); // true (문자열)
isBasicType(42); // true (숫자)
isBasicType(Symbol()); // true (심볼)
isBasicType([]); // false (모든 조건에 맞지 않음)

// 배열로 조건 함수들을 전달할 수도 있어요
const checker = overSome([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

checker({ a: 0, b: 2 }); // true (b가 0보다 큰 조건 만족)
checker({ a: 0, b: 0 }); // false (모든 조건이 불만족)

// 여러 인자를 받는 함수들도 사용할 수 있어요
const multiArgChecker = overSome(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a > 0 && b > 0
);

multiArgChecker("hello", "world"); // true (첫 번째 조건 만족)
multiArgChecker(1, 10); // true (두 번째 조건 만족)
multiArgChecker(0, 2); // false (모든 조건 불만족)
```

#### 파라미터

- `predicates` (`...Array<((...args: any[]) => boolean) | ReadonlyArray<(...args: any[]) => boolean>>`): 조건 함수 또는 조건 함수 배열들이에요. 각 조건 함수는 하나 이상의 값을 받아서 참/거짓을 반환해요.

### 반환 값

(`(...args: any[]) => boolean`): 값들을 받아서 어떤 조건 함수라도 참을 반환하면 `true`, 모두 거짓이면 `false`를 반환하는 함수를 반환해요.