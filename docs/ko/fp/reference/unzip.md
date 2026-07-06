# unzip (함수형 프로그래밍)

zip으로 묶인 배열을 위치별로 다시 묶는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, unzip());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`unzip`](../../reference/array/unzip.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`unzip`은 묶인 값들의 배열을 받아 각 위치의 값끼리 모은 배열들을 반환해요.

```typescript
import { pipe, unzip } from 'es-toolkit/fp';

pipe(
  [
    [1, 'a'],
    [2, 'b'],
  ],
  unzip()
); // => [[1, 2], ['a', 'b']]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `unzip()`처럼 호출하세요.

#### 반환 값

(`(zipped: ReadonlyArray<[...T]>) => Unzip<T>`): zip된 행을 위치별 배열로 변환하는 함수예요.
