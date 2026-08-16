# unzipWith (함수형 프로그래밍)

zip으로 묶인 배열을 위치별로 다시 묶고 각 위치를 결합하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, unzipWith(iteratee));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`unzipWith`](../../reference/array/unzipWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`unzipWith`는 묶인 행에서 같은 위치의 값들을 모아 `iteratee`에 전달하고 그 결과를 반환해요.

```typescript
import { pipe, unzipWith } from 'es-toolkit/fp';

pipe(
  [
    [1, 10],
    [2, 20],
  ],
  unzipWith((a, b) => a + b)
); // => [3, 30]
```

#### 파라미터

- `iteratee` (`(...args: T[]) => R`): 같은 위치의 값들을 결합하는 함수예요.

#### 반환 값

(`(target: readonly T[][]) => R[]`): zip된 행을 위치별 결합 결과로 변환하는 함수예요.
