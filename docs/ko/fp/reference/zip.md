# zip (함수형 프로그래밍)

여러 배열의 값을 인덱스별로 묶는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, zip(...arrs));
```

## 사용법

`zip`은 파이프된 배열과 설정한 배열들의 같은 인덱스 값을 묶어요. 배열 길이가 다르면 빠진 값은 `undefined`가 돼요.

```typescript
import { zip, pipe } from 'es-toolkit/fp';

pipe([1, 2], zip(['a', 'b'])); // => [[1, 'a'], [2, 'b']]

pipe([1, 2, 3], zip(['a'])); // => [[1, 'a'], [2, undefined], [3, undefined]]
```

#### 파라미터

- `arrs` (`Array<readonly T[]>`): 파이프된 배열과 함께 묶을 배열들이에요.

#### 반환 값

(`(array: readonly T[]) => T[][]`): 파이프된 배열을 인덱스별로 묶인 행 배열로 변환하는 함수예요.
