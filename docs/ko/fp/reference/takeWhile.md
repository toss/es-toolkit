# takeWhile (함수형 프로그래밍)

조건을 만족하는 동안 배열 앞의 값을 가져오는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, takeWhile(predicate));
```

## 사용법

`takeWhile`는 파이프된 배열을 앞에서부터 보면서 `predicate`가 `true`를 반환하는 동안 값을 유지해요. 지연 평가가 가능해서 [`pipe`](./pipe.md) 안의 앞선 지연 연산을 일찍 멈출 수 있어요.

```typescript
import { takeWhile, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 1], takeWhile(value => value < 3)); // => [1, 2]
```

#### 파라미터

- `predicate` (`(element: T, index: number) => boolean`): 앞의 값을 유지할지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 조건을 만족하는 앞부분 값 배열로 변환하는 함수예요.
