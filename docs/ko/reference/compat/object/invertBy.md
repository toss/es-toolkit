# invertBy (Lodash 호환성)

::: warning 현대적인 JavaScript API를 사용하세요

이 `invertBy` 함수는 복잡한 반복자 처리와 그룹핑 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.entries()`와 `reduce()` 또는 `Map`을 사용하세요.

:::

객체의 키와 값을 뒤바꾸면서, 같은 값들을 배열로 그룹화해요.

```typescript
const inverted = invertBy(object, iteratee);
```

## 레퍼런스

### `invertBy(object, iteratee?)`

객체의 키와 값을 뒤바꾸면서 같은 값을 가진 키들을 배열로 묶고 싶을 때 `invertBy`를 사용하세요. 선택적으로 반복자 함수를 제공해서 값을 변환할 수 있어요.

```typescript
import { invertBy } from 'es-toolkit/compat';

// 기본 키-값 뒤바꾸기 (같은 값들이 배열로 그룹화됨)
const object = { a: 1, b: 2, c: 1 };
invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }

// 반복자 함수를 사용한 값 변환
const ages = { john: 25, jane: 30, bob: 25 };
invertBy(ages, age => `age_${age}`);
// => { 'age_25': ['john', 'bob'], 'age_30': ['jane'] }

// 문자열 길이로 그룹화
const words = { a: 'hello', b: 'world', c: 'hi', d: 'test' };
invertBy(words, word => word.length);
// => { '5': ['a', 'b'], '2': ['c'], '4': ['d'] }
```

객체 속성을 기준으로 그룹화할 수도 있어요.

```typescript
import { invertBy } from 'es-toolkit/compat';

// 객체 속성으로 그룹화
const users = {
  user1: { department: 'IT', age: 30 },
  user2: { department: 'HR', age: 25 },
  user3: { department: 'IT', age: 35 },
};

invertBy(users, user => user.department);
// => { 'IT': ['user1', 'user3'], 'HR': ['user2'] }
```

`null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { invertBy } from 'es-toolkit/compat';

invertBy(null);
// => {}

invertBy(undefined);
// => {}
```

#### 파라미터

- `object` (`object`): 뒤바꿀 객체예요.
- `iteratee` (`ValueIteratee`, 선택): 값을 변환하는 함수예요. 기본값은 값 자체를 그대로 사용하는 함수예요.

#### 반환 값

(`Record<string, string[]>`): 변환된 값들을 키로 하고, 원래 키들의 배열을 값으로 하는 새로운 객체를 반환해요.
