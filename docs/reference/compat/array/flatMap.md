# flatMap (Lodash Compatibility)

::: warning Use `flatMap` from `es-toolkit`

This `flatMap` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, and supporting various condition function formats.

Use the faster and more modern [flatMap](../../array/flatMap.md) from `es-toolkit` instead.

:::

Applies a function to each element and flattens the result.

```typescript
const result = flatMap(collection, iteratee);
```

## Reference

### `flatMap(collection, iteratee)`

Applies an iteratee function to each element of a collection and returns an array flattened by one level. Supports arrays, objects, and strings, and can use various forms of iteratees.

```typescript
import { flatMap } from 'es-toolkit/compat';

// Apply a function to an array
function duplicate(n) {
  return [n, n];
}
flatMap([1, 2], duplicate);
// Result: [1, 1, 2, 2]

// Apply a function to an object
const obj = { a: 1, b: 2 };
flatMap(obj, (value, key) => [key, value]);
// Result: ['a', 1, 'b', 2]

// Map with a string property
const users = [
  { user: 'barney', hobbies: ['hiking', 'coding'] },
  { user: 'fred', hobbies: ['reading'] },
];
flatMap(users, 'hobbies');
// Result: ['hiking', 'coding', 'reading']
```

Using without an iteratee flattens the values by one level.

```typescript
import { flatMap } from 'es-toolkit/compat';

const obj = { a: [1, 2], b: [3, 4] };
flatMap(obj);
// Result: [1, 2, 3, 4]
```

Conditional mapping with a partial object is also possible.

```typescript
import { flatMap } from 'es-toolkit/compat';

const users = [
  { user: 'barney', age: 36, active: true },
  { user: 'fred', age: 40, active: false },
];
flatMap(users, { active: false });
// Result: [false] (matching result of elements where active is false)
```

#### Parameters

- `collection` (`object | null | undefined`): The collection to iterate over. Can be an array, object, or string.
- `iteratee` (`ListIterator | ObjectIterator | string | object`, optional): The iteratee to apply to each element. Can be a function, property name, or partial object.

#### Returns

(`any[]`): Returns a new array flattened by one level after mapping.
