# chunkBy (함수형 프로그래밍)

키가 바뀔 때마다 인접한 값을 나누는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, chunkBy(iteratee));
```

## 사용법

`chunkBy`는 파이프된 배열을 왼쪽에서 오른쪽으로 순회하면서 `iteratee`가 같은 키를 반환하는 인접 값을 묶어요. 키가 바뀌면 새 청크가 시작돼요.

```typescript
import { chunkBy, pipe } from 'es-toolkit/fp';

pipe([1, 1, 2, 2, 1], chunkBy(value => value)); // => [[1, 1], [2, 2], [1]]
```

#### 파라미터

- `iteratee` (`(value: T) => unknown`): 각 값의 그룹 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): `readonly T[]`를 인접 값 청크 배열로 변환하는 함수예요.
