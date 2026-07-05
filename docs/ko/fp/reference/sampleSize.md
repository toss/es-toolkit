# sampleSize (함수형 프로그래밍)

배열에서 임의의 값 여러 개를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, sampleSize(size));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`sampleSize`](../../reference/array/sampleSize.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`sampleSize`는 파이프된 배열에서 `size`개의 임의 값을 반환해요. 같은 배열 위치는 반복하지 않아요.

```typescript
import { pipe, sampleSize } from 'es-toolkit/fp';

const values = pipe([1, 2, 3, 4], sampleSize(2));
// values has length 2 and contains values from the input array.
```

#### 파라미터

- `size` (`number`): 반환할 임의 값의 개수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 임의 값 배열로 변환하는 함수예요.

#### 에러

`size`가 파이프된 배열의 길이보다 크면 에러를 던져요.
