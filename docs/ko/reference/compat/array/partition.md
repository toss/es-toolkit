# partition (Lodash 호환성)

::: warning `es-toolkit`의 [partition](../../array/partition.md)를 사용하세요

이 `partition` 함수는 `null`이나 `undefined` 처리, 다양한 조건 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [partition](../../array/partition.md)를 사용하세요.

:::

컬렉션의 요소들을 조건에 따라 두 그룹으로 나누어요.

```typescript
const [truthy, falsy] = partition(collection, predicate);
```

## 레퍼런스

### `partition(collection, predicate)`

배열이나 객체의 요소들을 주어진 조건 함수에 따라 두 그룹으로 나누어요. 첫 번째 그룹은 조건이 참인 요소들이고, 두 번째 그룹은 조건이 거짓인 요소들이에요.

```typescript
import { partition } from 'es-toolkit/compat';

// 숫자 배열을 짝수와 홀수로 나누기
partition([1, 2, 3, 4, 5, 6], n => n % 2 === 0);
// => [[2, 4, 6], [1, 3, 5]]

// 속성 이름으로 조건 지정하기
const users = [
  { name: 'john', active: true },
  { name: 'jane', active: false },
  { name: 'bob', active: true },
];

partition(users, 'active');
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// 객체 조건으로 필터링하기
partition(users, { active: true });
// => [
//   [{ name: 'john', active: true }, { name: 'bob', active: true }],
//   [{ name: 'jane', active: false }]
// ]

// 배열 조건으로 필터링하기
partition(users, ['name', 'john']);
// => [
//   [{ name: 'john', active: true }],
//   [{ name: 'jane', active: false }, { name: 'bob', active: true }]
// ]
```

객체의 경우 값들을 분할해요.

```typescript
import { partition } from 'es-toolkit/compat';

const obj = {
  a: { score: 90 },
  b: { score: 40 },
  c: { score: 80 },
};

partition(obj, item => item.score >= 80);
// => [[{ score: 90 }, { score: 80 }], [{ score: 40 }]]
```

`null`이나 `undefined`는 빈 배열들로 처리해요.

```typescript
import { partition } from 'es-toolkit/compat';

partition(null, x => x > 0); // [[], []]
partition(undefined, 'active'); // [[], []]
```

#### 파라미터

- `collection` (`ArrayLike<T> | T | null | undefined`): 분할할 배열이나 객체예요.
- `predicate` (`((value: T) => unknown) | Partial<T> | [PropertyKey, any] | PropertyKey`, 선택): 각 요소를 테스트할 조건이에요. 함수, 부분 객체, 속성-값 배열, 속성 이름을 사용할 수 있어요. 기본값은 `identity`예요.

### 반환 값

(`[T[], T[]]`): 조건을 만족하는 요소들의 배열과 만족하지 않는 요소들의 배열로 구성된 배열을 반환해요.
