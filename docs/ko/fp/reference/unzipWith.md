# unzipWith (함수형 프로그래밍)

zip으로 묶인 배열을 위치별로 다시 묶고 각 위치를 결합하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, unzipWith(iteratee));
```

## 사용법

`unzipWith`는 묶인 행에서 같은 위치의 값들을 모아 `iteratee`에 전달하고 그 결과를 반환해요.

```typescript
import { unzipWith, pipe } from 'es-toolkit/fp';

pipe([[1, 10], [2, 20]], unzipWith((a, b) => a + b)); // => [3, 30]
```

#### 파라미터

- `iteratee` (`(...args: T[]) => R`): 같은 위치의 값들을 결합하는 함수예요.

#### 반환 값

(`(target: readonly T[][]) => R[]`): zip된 행을 위치별 결합 결과로 변환하는 함수예요.
