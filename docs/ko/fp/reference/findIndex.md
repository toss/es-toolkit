# findIndex (함수형 프로그래밍)

조건을 만족하는 첫 번째 값의 인덱스를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, findIndex(predicate));
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`findIndex`는 파이프된 배열에서 `predicate`가 `true`를 반환하는 첫 번째 값의 인덱스를 반환해요. 일치하는 값이 없으면 `-1`을 반환해요.

```typescript
import { findIndex, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findIndex(value => value > 2)
); // => 2
```

#### 파라미터

- `predicate` (`(value: T, index: number) => boolean`): 각 값을 검사하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => number`): `readonly T[]`를 첫 번째 일치 인덱스나 `-1`로 변환하는 함수예요.
