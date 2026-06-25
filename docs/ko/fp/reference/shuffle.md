# shuffle (함수형 프로그래밍)

배열을 섞은 복사본을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, shuffle());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`shuffle`](../../reference/array/shuffle.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`shuffle`은 파이프된 배열과 같은 값을 임의 순서로 담은 새 배열을 반환해요. 입력 배열은 변경하지 않아요.

```typescript
import { pipe, shuffle } from 'es-toolkit/fp';

const values = pipe([1, 2, 3], shuffle());
// values contains 1, 2, and 3 in random order.
```

#### 파라미터

이 함수는 인자를 받지 않아요. `shuffle()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 섞은 복사본으로 변환하는 함수예요.
