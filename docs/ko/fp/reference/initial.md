# initial (함수형 프로그래밍)

마지막 값을 제외한 모든 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, initial());
```

## 사용법

`initial`은 파이프된 배열에서 마지막 값을 제외한 새 배열을 반환해요.

```typescript
import { initial, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], initial()); // => [1, 2]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `initial()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 마지막 값을 제외한 배열로 변환하는 함수예요.
