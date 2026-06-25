# isSubset (함수형 프로그래밍)

파이프된 배열이 다른 배열의 부분집합인지 확인하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, isSubset(superset));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`isSubset`](../../reference/array/isSubset.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`isSubset`은 파이프된 배열의 모든 값이 `superset`에 있으면 `true`를 반환해요.

```typescript
import { isSubset, pipe } from 'es-toolkit/fp';

pipe([1, 2], isSubset([1, 2, 3])); // => true

pipe([1, 4], isSubset([1, 2, 3])); // => false
```

#### 파라미터

- `superset` (`readonly T[]`): 파이프된 배열의 모든 값을 포함할 수 있는 배열이에요.

#### 반환 값

(`(array: readonly T[]) => boolean`): `readonly T[]`를 부분집합 여부로 변환하는 함수예요.
