# dropRight (함수형 프로그래밍)

배열 끝에서 값을 버리는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, dropRight(count));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`dropRight`](../../reference/array/dropRight.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`dropRight`는 파이프된 배열 끝에서 `count`개의 값을 제거해요.

```typescript
import { dropRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], dropRight(2)); // => [1, 2]
```

#### 파라미터

- `count` (`number`): 끝에서 제거할 값의 개수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 남은 값 배열로 변환하는 함수예요.
