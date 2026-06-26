# chunk (함수형 프로그래밍)

배열을 주어진 길이의 하위 배열로 나누는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, chunk(size));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`chunk`](../../reference/array/chunk.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`chunk`는 배열을 각각 `size` 길이의 하위 배열로 나눠요. 배열이 균등하게 나눠지지 않으면, 마지막 청크에 남은 요소들이 담겨요.

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// 배열보다 큰 size를 주면 하나의 청크가 돼요.
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### 파라미터

- `size` (`number`): 각 청크의 길이예요. 양의 정수여야 해요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): `readonly T[]`를 청크 배열로 변환하는 함수예요.

#### 에러

`size`가 양의 정수가 아니면 에러를 던져요.
