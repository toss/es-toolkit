# zipWith (함수형 프로그래밍)

여러 배열의 값을 인덱스별로 결합하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, zipWith(...arrs, combine));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`zipWith`](../../reference/array/zipWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`zipWith`는 파이프된 배열과 설정한 배열들의 같은 인덱스 값을 `combine`에 전달해요. 배열 길이가 다르면 빠진 값은 `undefined`로 전달돼요.

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
); // => [11, 22]

pipe(
  [1, 2, 3],
  zipWith([10], (a, b = 0) => a + b)
); // => [11, 2, 3]
```

#### 파라미터

- `arrs` (`Array<readonly unknown[]>`): 파이프된 배열과 함께 결합할 배열들이에요.
- `combine` (`(...values: unknown[]) => R`): 같은 인덱스의 값들과 마지막 인덱스를 받아 새 값을 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => R[]`): 파이프된 배열을 결합된 값 배열로 변환하는 함수예요.
