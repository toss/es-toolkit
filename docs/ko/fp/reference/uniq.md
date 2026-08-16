# uniq (함수형 프로그래밍)

배열에서 중복된 값을 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, uniq());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`uniq`](../../reference/array/uniq.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`uniq`는 고유한 값만 담은 새로운 배열을 반환하고, 처음 나타나는 순서를 유지해요. 동등성은 `SameValueZero`(`Set`의 동작 방식)를 따라요.

```typescript
import { pipe, uniq } from 'es-toolkit/fp';

pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]

// 처음 나타나는 순서를 유지해요.
pipe([3, 1, 2, 1, 3], uniq()); // => [3, 1, 2]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `uniq()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 중복이 없는 새로운 `T[]`로 변환하는 함수예요.
