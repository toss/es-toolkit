# tail (함수형 프로그래밍)

첫 번째 값을 제외한 모든 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, tail());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`tail`](../../reference/array/tail.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`tail`은 파이프된 배열에서 첫 번째 값을 제외한 새 배열을 반환해요.

```typescript
import { pipe, tail } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `tail()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 첫 번째 값을 제외한 배열로 변환하는 함수예요.
