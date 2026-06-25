# dropRightWhile (함수형 프로그래밍)

조건을 만족하는 동안 배열 끝의 값을 버리는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, dropRightWhile(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`dropRightWhile`](../../reference/array/dropRightWhile.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`dropRightWhile`는 파이프된 배열을 끝에서부터 보면서 `predicate`가 `true`를 반환하는 동안 값을 제거해요. 조건을 만족하지 않는 첫 값에서 멈춰요.

```typescript
import { dropRightWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  dropRightWhile(value => value > 2)
); // => [1, 2]
```

#### 파라미터

- `predicate` (`(item: T) => boolean`): 끝의 값을 제거할지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 끝에서 값을 제거한 뒤 남은 배열로 변환하는 함수예요.
