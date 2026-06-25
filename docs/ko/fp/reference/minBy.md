# minBy (함수형 프로그래밍)

계산된 값이 가장 작은 항목을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, minBy(getValue));
```

## 사용법

`minBy`는 파이프된 배열의 각 값에 `getValue`를 호출하고 그 결과가 가장 작은 값을 반환해요. 배열이 비어 있으면 `undefined`를 반환해요.

```typescript
import { minBy, pipe } from 'es-toolkit/fp';

pipe([{ score: 10 }, { score: 30 }, { score: 20 }], minBy(item => item.score)); // => { score: 10 }
```

#### 파라미터

- `getValue` (`(item: T) => number`): 비교에 사용할 값을 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T | undefined`): `readonly T[]`를 최솟값 항목이나 `undefined`로 변환하는 함수예요.
