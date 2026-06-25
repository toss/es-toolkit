# countBy (함수형 프로그래밍)

키별로 값의 개수를 세는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, countBy(mapper));
```

## 사용법

`countBy`는 파이프된 배열의 각 값에 `mapper`를 호출하고, mapper 결과를 키로, 개수를 값으로 하는 객체를 반환해요.

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

pipe(['one', 'two', 'three'], countBy(word => word.length)); // => { 3: 2, 5: 1 }
```

#### 파라미터

- `mapper` (`(item: T) => K`): 개수를 셀 때 사용할 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => Record<K, number>`): `readonly T[]`를 키별 개수 객체로 변환하는 함수예요.
