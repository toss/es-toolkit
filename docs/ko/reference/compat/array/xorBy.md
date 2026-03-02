# xorBy (Lodash 호환성)

::: warning `es-toolkit`의 [xorBy](../../array/xorBy.md)을 사용하세요

이 `xorBy` 함수는 `null`이나 `undefined` 처리, 복잡한 중복 계산 로직 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [xorBy](../../array/xorBy.md)를 사용하세요.

:::

여러 배열들에서 변환 함수를 기준으로 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 만들어요.

```typescript
const result = xorBy(...arrays, iteratee);
```

## 사용법

### `xorBy(...arrays, iteratee)`

여러 배열의 대칭 차집합을 변환 함수를 기준으로 계산해요. 각 요소에 변환 함수를 적용한 결과가 정확히 하나의 배열에만 존재하는 요소들을 반환해요. 객체 배열에서 특정 속성을 기준으로 비교하거나, 숫자 배열에서 특정 계산 결과를 기준으로 비교할 때 유용해요.

```typescript
import { xorBy } from 'es-toolkit/compat';

// Math.floor 결과로 대칭 차집합 계산
xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// Returns: [1.2, 4.3]

// 객체 속성으로 대칭 차집합 계산
xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 2 }]

// 함수로 대칭 차집합 계산
const users1 = [{ name: 'John', age: 30 }];
const users2 = [
  { name: 'Jane', age: 25 },
  { name: 'John', age: 30 },
];
xorBy(users1, users2, user => user.name);
// Returns: [{ name: 'Jane', age: 25 }]

// 세 배열의 대칭 차집합
xorBy([1.2, 2.3], [3.4, 4.5], [5.6, 6.7], Math.floor);
// Returns: [1.2, 2.3, 3.4, 4.5, 5.6, 6.7]
```

`null`이나 `undefined`는 무시돼요.

```typescript
import { xorBy } from 'es-toolkit/compat';

xorBy([2.1, 1.2], null, [4.3, 2.4], Math.floor);
// Returns: [1.2, 4.3]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ValueIteratee<T>>`): 대칭 차집합을 계산할 배열들과 마지막에 변환 함수예요. 함수, 속성 이름, 부분 객체 등을 사용할 수 있어요.

#### 반환 값

(`T[]`): 변환 함수 결과를 기준으로 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 반환해요.
