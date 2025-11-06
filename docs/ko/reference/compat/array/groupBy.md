# groupBy (Lodash 호환성)

::: warning `es-toolkit`의 [groupBy](../../array/groupBy.md)를 사용하세요

이 `groupBy` 함수는 `null`이나 `undefined` 처리, 객체 지원, 복잡한 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [groupBy](../../array/groupBy.md)를 사용하세요.

:::

배열이나 객체의 요소들을 주어진 조건에 따라 그룹으로 나눠요.

```typescript
const grouped = groupBy(collection, iteratee);
```

## 사용법

### `groupBy(collection, iteratee)`

배열이나 객체의 각 요소를 주어진 조건 함수에 따라 그룹으로 나누고, 그룹별로 분류된 객체를 반환해요. 조건은 함수, 프로퍼티 이름, 부분 객체 등 다양한 형태로 제공할 수 있어요.

```typescript
import { groupBy } from 'es-toolkit/compat';

// 함수로 그룹 나누기
const array = [6.1, 4.2, 6.3];
const result = groupBy(array, Math.floor);
// result는 { '4': [4.2], '6': [6.1, 6.3] }

// 프로퍼티 이름으로 그룹 나누기
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 30 },
];
const byAge = groupBy(users, 'age');
// byAge는 { '25': [{ name: 'jane', age: 25 }], '30': [{ name: 'john', age: 30 }, { name: 'bob', age: 30 }] }

// 객체에서 그룹 나누기
const obj = { a: 6.1, b: 4.2, c: 6.3 };
const groupedObj = groupBy(obj, Math.floor);
// groupedObj는 { '4': [4.2], '6': [6.1, 6.3] }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { groupBy } from 'es-toolkit/compat';

groupBy(null, x => x); // {}
groupBy(undefined, x => x); // {}
```

부분 객체나 프로퍼티-값 쌍으로도 그룹을 나눌 수 있어요.

```typescript
import { groupBy } from 'es-toolkit/compat';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

// 부분 객체로 그룹 나누기
const byCategory = groupBy(products, { category: 'fruit' });
// 프로퍼티-값 쌍으로 그룹 나누기
const byName = groupBy(products, ['name', 'apple']);
```

#### 파라미터

- `collection` (`ArrayLike<T> | Record<any, T> | null | undefined`): 그룹으로 나눌 배열이나 객체예요.
- `iteratee` (`Function | PropertyKey | Array | Object`, 선택): 그룹을 나누는 조건이에요. 함수, 프로퍼티 이름, 프로퍼티-값 쌍, 또는 부분 객체일 수 있어요. 기본값은 `identity` 함수예요.

#### 반환 값

(`Record<string, T[]>`): 각 키가 그룹의 조건값이고, 값이 해당 그룹에 속하는 요소들의 배열인 객체를 반환해요.
