# keyBy (함수형 프로그래밍)

각 값을 기준으로 키를 만든 객체를 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, keyBy(getKey));
```

## 사용법

`keyBy`는 파이프된 배열의 각 값에 `getKey`를 호출하고, 반환된 키를 키로, 원래 항목을 값으로 하는 객체를 반환해요. 같은 키가 있으면 뒤의 값이 앞의 값을 덮어써요.

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

pipe([{ id: 'a', value: 1 }, { id: 'b', value: 2 }], keyBy(item => item.id)); // => { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

#### 파라미터

- `getKey` (`(item: T) => K`): 각 값의 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => Record<K, T>`): `readonly T[]`를 `getKey`로 만든 키 객체로 변환하는 함수예요.
