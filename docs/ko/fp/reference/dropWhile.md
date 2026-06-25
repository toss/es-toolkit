# dropWhile (함수형 프로그래밍)

조건을 만족하는 동안 배열 앞의 값을 버리는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, dropWhile(predicate));
```

## 사용법

`dropWhile`는 파이프된 배열을 앞에서부터 보면서 `predicate`가 `true`를 반환하는 동안 값을 제거해요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { dropWhile, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 1], dropWhile(value => value < 3)); // => [3, 1]
```

#### 파라미터

- `predicate` (`(item: T, index: number) => boolean`): 앞의 값을 제거할지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 앞에서 값을 제거한 뒤 남은 배열로 변환하는 함수예요.
