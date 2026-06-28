# cartesianProduct (함수형 프로그래밍)

파이프된 배열과 다른 배열들의 카테시안 곱을 구하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, cartesianProduct(...arrs));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`cartesianProduct`](../../reference/array/cartesianProduct.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`cartesianProduct`는 파이프된 배열과 설정한 각 배열에서 값을 하나씩 뽑아 만들 수 있는 모든 튜플을 반환해요. 가장 오른쪽 배열이 가장 빠르게 바뀌어요.

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

pipe([1, 2], cartesianProduct(['a', 'b'])); // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

pipe([], cartesianProduct(['a', 'b'])); // => []
```

#### 파라미터

- `arrs` (`Array<readonly T[]>`): 파이프된 배열 뒤에 포함할 배열들이에요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): 파이프된 배열을 카테시안 곱 튜플 배열로 변환하는 함수예요.
