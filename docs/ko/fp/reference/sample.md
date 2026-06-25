# sample (함수형 프로그래밍)

배열에서 임의의 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, sample());
```

## 사용법

`sample`은 파이프된 배열에서 임의의 값 하나를 반환해요.

```typescript
import { sample, pipe } from 'es-toolkit/fp';

const value = pipe([1, 2, 3], sample());
// value is one of 1, 2, or 3.
```

#### 파라미터

이 함수는 인자를 받지 않아요. `sample()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T`): `readonly T[]`를 임의의 값 하나로 변환하는 함수예요.
