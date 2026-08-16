# flatten (함수형 프로그래밍)

중첩 배열을 주어진 깊이만큼 펼치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, flatten(depth));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`flatten`](../../reference/array/flatten.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`flatten`은 파이프된 배열을 `depth` 깊이까지 펼쳐요. `depth`를 생략하면 한 단계만 펼쳐요. 한 단계 펼치기는 [`pipe`](./pipe.md) 안에서 지연 평가가 가능해요.

```typescript
import { flatten, pipe } from 'es-toolkit/fp';

pipe([[1], [2, 3], [4]], flatten()); // => [1, 2, 3, 4]
```

#### 파라미터

- `depth` (`number, optional`): 펼칠 깊이예요. 기본값은 `1`이에요.

#### 반환 값

(`(array: readonly T[]) => Array<FlatArray<T[], D>>`): 중첩 배열을 펼친 배열로 변환하는 함수예요.
