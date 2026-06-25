# filter (함수형 프로그래밍)

`Array.prototype.filter`처럼, 검사를 통과하는 요소만 남기는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, filter(predicate));
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`filter`는 `predicate`가 참 같은 값(truthy)을 반환하는 요소만 남겨요. 타입 술어(type predicate)를 쓰면 결과의 요소 타입이 좁혀져요. 이 함수는 **지연 평가가 가능해요**. [`pipe`](./pipe.md) 안에서는 인접한 지연 연산과 합쳐져요.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

// 짝수만 남겨요.
pipe(
  [1, 2, 3, 4],
  filter(x => x % 2 === 0)
); // => [2, 4]

// 두 번째 인자로 인덱스를 사용할 수 있어요.
pipe(
  [10, 20, 30, 40],
  filter((_value, index) => index % 2 === 0)
); // => [10, 30]
```

타입 가드(type guard)를 쓰면 결과 타입이 좁혀져요.

```typescript
import { filter, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 'a', 2, 'b'],
  filter((x): x is string => typeof x === 'string')
);
// result는 string[]로 추론되고 ['a', 'b']와 같아요
```

#### 파라미터

- `predicate` (`(value: T, index: number) => boolean`): 각 요소마다 호출되는 함수예요. 요소를 남기려면 `true`를 반환하세요. 타입 가드(`value is S`)를 쓰면 결과 타입이 좁혀져요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 필터링된 배열로 변환하는 함수예요. 타입 가드를 쓰면 결과는 `S[]`가 돼요.
