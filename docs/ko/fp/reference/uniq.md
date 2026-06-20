# uniq

배열에서 중복된 값을 제거하는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(array, uniq());
```

## 사용법

`uniq`는 고유한 값만 담은 새로운 배열을 반환하고, 처음 나타나는 순서를 유지해요. 동등성은 `SameValueZero`(`Set`의 규칙)를 따라요.

```typescript
import { pipe, uniq } from 'es-toolkit/fp';

pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]

// 처음 나타나는 순서를 유지해요.
pipe([3, 1, 2, 1, 3], uniq()); // => [3, 1, 2]
```

#### 파라미터

이 연산자는 인자를 받지 않아요. `uniq()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 중복이 없는 새로운 `T[]`로 변환하는, 데이터를 마지막에 받는 연산자예요.
