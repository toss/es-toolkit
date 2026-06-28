# compact (함수형 프로그래밍)

배열에서 거짓으로 평가되는 값을 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, compact());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`compact`](../../reference/array/compact.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`compact`는 `false`, `null`, `undefined`, `0`, `-0`, `0n`, 빈 문자열, `NaN`을 제거해요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해서, 마지막에 오는 `take`가 순회를 일찍 멈출 수 있어요.

```typescript
import { compact, pipe } from 'es-toolkit/fp';

pipe([0, 1, false, 2, '', 3], compact()); // => [1, 2, 3]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `compact()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => Array<NotFalsey<T>>`): `readonly T[]`를 거짓으로 평가되는 값이 없는 배열로 변환하는 함수예요.
