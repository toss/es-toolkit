# flatMap (함수형 프로그래밍)

각 값을 배열로 변환한 뒤 결과를 한 단계 펼치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, flatMap(callback));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`flatMap`](../../reference/array/flatMap.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`flatMap`은 파이프된 배열의 각 값에 `callback`을 호출하고 반환된 배열들을 이어 붙여요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { flatMap, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  flatMap(value => [value, value * 10])
); // => [1, 10, 2, 20, 3, 30]
```

#### 파라미터

- `callback` (`(value: T, index: number) => U[]`): 각 값을 배열로 변환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => U[]`): `readonly T[]`를 callback 결과를 펼친 배열로 변환하는 함수예요.
