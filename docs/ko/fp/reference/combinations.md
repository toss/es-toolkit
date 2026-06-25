# combinations (함수형 프로그래밍)

주어진 크기의 조합을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, combinations(size));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`combinations`](../../reference/array/combinations.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`combinations`는 파이프된 배열에서 `size`개의 값을 고르는 모든 방법을 반환해요. 각 조합 안에서는 원래 순서가 유지돼요.

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], combinations(2)); // => [['a', 'b'], ['a', 'c'], ['b', 'c']]
```

#### 파라미터

- `size` (`number`): 각 조합에 들어갈 값의 개수예요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): `readonly T[]`를 조합 배열로 변환하는 함수예요.

#### 에러

`size`가 음이 아닌 정수가 아니면 에러를 던져요.
