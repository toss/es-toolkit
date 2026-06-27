# maxBy (함수형 프로그래밍)

계산된 값이 가장 큰 항목을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, maxBy(getValue));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`maxBy`](../../reference/array/maxBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`maxBy`는 파이프된 배열의 각 값에 `getValue`를 호출하고 그 결과가 가장 큰 값을 반환해요. 배열이 비어 있으면 `undefined`를 반환해요.

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ score: 10 }, { score: 30 }, { score: 20 }],
  maxBy(item => item.score)
); // => { score: 30 }
```

#### 파라미터

- `getValue` (`(item: T) => number`): 비교에 사용할 값을 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T | undefined`): `readonly T[]`를 최댓값 항목이나 `undefined`로 변환하는 함수예요.
