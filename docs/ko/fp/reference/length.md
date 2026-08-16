# length (함수형 프로그래밍)

배열의 길이를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, length());
```

::: info

이 헬퍼는 `es-toolkit/fp` 전용이에요. 이 동작을 [`pipe`](./pipe.md) 파이프라인의 한 단계로 조합하고 싶을 때 사용하세요.

:::

## 사용법

`length`는 파이프된 배열에 들어 있는 값의 개수를 반환해요.

```typescript
import { length, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], length()); // => 3
```

#### 파라미터

이 함수는 인자를 받지 않아요. `length()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => number`): `readonly T[]`를 길이로 변환하는 함수예요.
