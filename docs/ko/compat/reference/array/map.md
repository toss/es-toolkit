# map (Lodash 호환성)

::: warning `Array.prototype.map`을 사용하세요

이 `map` 함수는 `null`이나 `undefined` 처리, 객체 순회, 속성 추출 등 추가 기능으로 인해 느리게 동작해요. 배열을 변환할 때는 JavaScript의 기본 `Array.prototype.map` 메소드가 더 빠르고 간단해요.

대신 더 빠르고 현대적인 `Array.prototype.map`을 사용하세요.

:::

배열이나 객체의 각 요소를 변환하여 새로운 배열을 만들어요.

```typescript
const mapped = map(collection, iteratee);
```

## 사용법

### `map(collection, iteratee)`

배열, 객체, 또는 배열 형태의 객체의 각 요소를 변환하고 싶을 때 `map`을 사용하세요. 각 요소에 대해 반복 함수를 실행하고 결과를 새 배열로 반환해요.

```typescript
import { map } from 'es-toolkit/compat';

// 배열의 각 요소를 두 배로 만들어요.
map([1, 2, 3], x => x * 2);
// Returns: [2, 4, 6]

// 객체의 값들을 변환해요.
const obj = { a: 1, b: 2 };
map(obj, (value, key) => `${key}:${value}`);
// Returns: ['a:1', 'b:2']

// 속성을 추출해요.
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, 'name');
// Returns: ['John', 'Jane']
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { map } from 'es-toolkit/compat';

map(null, x => x); // []
map(undefined, x => x); // []
```

문자열로 속성 경로를 지정하면 중첩된 속성도 추출할 수 있어요.

```typescript
import { map } from 'es-toolkit/compat';

const users = [{ info: { name: 'John' } }, { info: { name: 'Jane' } }];
map(users, 'info.name');
// Returns: ['John', 'Jane']
```

객체를 전달하면 각 요소가 그 객체와 일치하는지 확인해요.

```typescript
import { map } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, { age: 30 });
// Returns: [true, false]
```

#### 파라미터

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 순회할 배열이나 객체예요.
- `iteratee` (`function | string | object`, 선택): 각 요소에 대해 실행할 함수나 속성 경로, 또는 일치시킬 객체예요. 제공하지 않으면 각 요소를 그대로 반환해요.
  - 함수인 경우 `(value, key, collection)` 형태로 호출돼요.
  - 문자열인 경우 해당 속성을 추출해요.
  - 객체인 경우 각 요소가 객체와 일치하는지 확인해요.

#### 반환 값

(`U[]`): 변환된 값들의 새로운 배열을 반환해요.
