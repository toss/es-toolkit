# without (함수형 프로그래밍)

배열에서 특정 값을 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, without(...values));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`without`](../../reference/array/without.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`without`은 파이프된 배열에서 `values` 중 하나와 같은 모든 값을 제거해요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { pipe, without } from 'es-toolkit/fp';

pipe([1, 2, 3, 2], without(2)); // => [1, 3]
```

#### 파라미터

- `values` (`T[]`): 파이프된 배열에서 제거할 값들이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 `values`가 없는 배열로 변환하는 함수예요.
