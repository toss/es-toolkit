# takeRight (함수형 프로그래밍)

배열 끝에서 값을 가져오는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, takeRight(count));
```

## 사용법

`takeRight`는 파이프된 배열 끝에서 `count`개의 값을 반환해요.

```typescript
import { takeRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], takeRight(2)); // => [3, 4]
```

#### 파라미터

- `count` (`number`): 끝에서 가져올 값의 개수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 끝의 `count`개 값 배열로 변환하는 함수예요.
