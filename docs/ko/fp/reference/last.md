# last (함수형 프로그래밍)

배열의 마지막 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, last());
```

## 사용법

`last`는 파이프된 배열의 마지막 값을 반환해요. 배열이 비어 있으면 `undefined`를 반환해요.

```typescript
import { last, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], last()); // => 3

pipe([], last()); // => undefined
```

#### 파라미터

이 함수는 인자를 받지 않아요. `last()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T | undefined`): `readonly T[]`를 마지막 값으로 변환하는 함수예요.
