# xorWith (함수형 프로그래밍)

사용자 정의 동등성 함수로 대칭 차집합을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, xorWith(secondArray, areItemsEqual));
```

## 사용법

`xorWith`는 `areItemsEqual` 기준으로 두 배열 사이에서 서로 일치하지 않는 값을 반환해요.

```typescript
import { xorWith, pipe } from 'es-toolkit/fp';

pipe([{ id: 1 }, { id: 2 }], xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)); // => [{ id: 1 }, { id: 3 }]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열과 비교할 배열이에요.
- `areItemsEqual` (`(item: T, other: T) => boolean`): 두 값이 같은지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 사용자 정의 동등성 기준 대칭 차집합으로 변환하는 함수예요.
