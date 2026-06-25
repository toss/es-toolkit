# tail (함수형 프로그래밍)

첫 번째 값을 제외한 모든 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, tail());
```

## 사용법

`tail`은 파이프된 배열에서 첫 번째 값을 제외한 새 배열을 반환해요.

```typescript
import { tail, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `tail()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 첫 번째 값을 제외한 배열로 변환하는 함수예요.
