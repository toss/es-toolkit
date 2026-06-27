# map (함수형 프로그래밍)

`Array.prototype.map`처럼, 배열의 모든 요소를 변환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, map(callbackfn));
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`map`은 각 요소에 `callbackfn`을 호출해서 새로운 배열을 만들어요. 이 함수는 **지연 평가가 가능해요**. [`pipe`](./pipe.md) 안에서는 인접한 지연 연산과 합쳐지기 때문에, 마지막에 오는 `take`가 작업을 일찍 멈출 수 있어요.

```typescript
import { map, pipe } from 'es-toolkit/fp';

// 각 요소를 변환해요.
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// 두 번째 인자로 인덱스를 사용할 수 있어요.
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// 요소의 타입을 바꿀 수 있어요.
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### 파라미터

- `callbackfn` (`(value: T, index: number) => U`): 각 요소마다 호출되는 함수예요. 이 함수의 반환 값이 출력 배열의 해당 요소가 돼요.

#### 반환 값

(`(array: readonly T[]) => U[]`): `readonly T[]`를 새로운 `U[]`로 변환하는 함수예요.
