# groupBy (함수형 프로그래밍)

값을 키별로 묶는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, groupBy(getKey));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`groupBy`](../../reference/array/groupBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`groupBy`는 파이프된 배열의 각 값에 `getKey`를 호출하고, 반환된 키를 키로, 일치하는 항목 배열을 값으로 하는 객체를 반환해요.

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  groupBy(word => word.length)
); // => { 3: ['one', 'two'], 5: ['three'] }
```

#### 파라미터

- `getKey` (`(item: T) => K`): 각 값의 그룹 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => Record<K, T[]>`): `readonly T[]`를 키별 그룹 배열 객체로 변환하는 함수예요.
