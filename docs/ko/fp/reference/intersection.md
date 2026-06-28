# intersection (함수형 프로그래밍)

다른 배열에도 있는 값을 유지하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, intersection(secondArray));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`intersection`](../../reference/array/intersection.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`intersection`은 파이프된 배열에서 `secondArray`에도 있는 값만 유지해요. 파이프된 배열의 순서를 보존해요.

```typescript
import { intersection, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], intersection([2, 3, 4])); // => [2, 3]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 유지할 값을 담은 배열이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 `secondArray`에도 있는 값 배열로 변환하는 함수예요.
