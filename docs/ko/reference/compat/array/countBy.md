# countBy (Lodash 호환성)

::: warning `es-toolkit`의 `countBy`를 사용하세요

이 `countBy` 함수는 복잡한 변환 함수 처리와 타입 변환으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [countBy](../../array/countBy.md)를 사용하세요.

:::

배열이나 객체의 요소들을 조건에 따라 분류해서 각 분류의 개수를 세어요.

```typescript
const counts = countBy(collection, iteratee);
```

## 레퍼런스

### `countBy(collection, iteratee?)`

배열이나 객체의 각 요소를 어떤 기준으로 그룹화하고, 각 그룹에 몇 개의 요소가 있는지 세고 싶을 때 `countBy`를 사용하세요. 반복자 함수가 반환하는 값이 키가 되고, 그 키에 해당하는 요소들의 개수가 값이 돼요.

```typescript
import { countBy } from 'es-toolkit/compat';

// 숫자를 소수점 아래 버림으로 그룹화
countBy([6.1, 4.2, 6.3], Math.floor);
// Returns: { '4': 1, '6': 2 }

// 문자열을 길이로 그룹화
countBy(['one', 'two', 'three'], 'length');
// Returns: { '3': 2, '5': 1 }

// 사용자를 나이대로 그룹화
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
  { name: 'Charlie', age: 25 },
];
countBy(users, user => Math.floor(user.age / 10) * 10);
// Returns: { '20': 2, '30': 1 }
```

객체도 처리할 수 있어요.

```typescript
import { countBy } from 'es-toolkit/compat';

// 객체의 값들을 타입으로 분류
const obj = { a: 1, b: 'string', c: 2, d: 'text' };
countBy(obj, value => typeof value);
// Returns: { 'number': 2, 'string': 2 }
```

반복자 함수 없이 사용하면 값 자체로 그룹화해요.

```typescript
import { countBy } from 'es-toolkit/compat';

// 값 자체로 그룹화
countBy([1, 2, 1, 3, 2, 1]);
// Returns: { '1': 3, '2': 2, '3': 1 }

// 불린 값으로 그룹화
countBy([true, false, true, true]);
// Returns: { 'true': 3, 'false': 1 }
```

`null`이나 `undefined` 컬렉션은 빈 객체를 반환해요.

```typescript
import { countBy } from 'es-toolkit/compat';

countBy(null);
// Returns: {}

countBy(undefined);
// Returns: {}
```

#### 파라미터

- `collection` (`ArrayLike<T> | object | null | undefined`): 처리할 배열이나 객체예요.
- `iteratee` (`ValueIteratee<T>`, 선택): 각 요소를 그룹화할 기준을 정하는 함수예요. 함수, 프로퍼티 이름, 또는 부분 객체를 사용할 수 있어요.

#### 반환 값

(`Record<string, number>`): 각 그룹의 키와 해당 그룹의 요소 개수를 가진 객체를 반환해요.
