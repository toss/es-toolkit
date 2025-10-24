# flatMapDeep (Lodash Compatibility)

::: warning Use [`flatMapDeep`](../../array/flatMapDeep.md) from `es-toolkit`

This `flatMapDeep` function operates slowly due to complex collection type handling and deep flattening logic.

Use the faster and more modern [flatMapDeep](../../array/flatMapDeep.md) from `es-toolkit` instead.

:::

Applies a function to each element and recursively flattens the result.

```typescript
const result = flatMapDeep(collection, iteratee);
```

## Reference

### `flatMapDeep(collection, iteratee)`

Applies an iteratee function to each element of a collection and returns an array flattened to infinite depth. All nested array structures are flattened into a one-dimensional array.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

// Apply a function to an array and deeply flatten
function duplicate(n) {
  return [[[n, n]]];
}
flatMapDeep([1, 2], duplicate);
// Result: [1, 1, 2, 2]

// Apply a function to an object and deeply flatten
const obj = { a: 1, b: 2 };
flatMapDeep(obj, (value, key) => [[[key, value]]]);
// Result: ['a', 1, 'b', 2]

// Map with a string property and deeply flatten
const users = [
  { user: 'barney', hobbies: [['hiking', 'coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDeep(users, 'hobbies');
// Result: ['hiking', 'coding', 'reading']
```

Using without an iteratee recursively flattens the values.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const obj = { a: [[1, 2]], b: [[[3]]] };
flatMapDeep(obj);
// Result: [1, 2, 3]
```

Conditional mapping with a partial object is also possible.

```typescript
import { flatMapDeep } from 'es-toolkit/compat';

const users = [
  { user: 'barney', active: [true, false] },
  { user: 'fred', active: [false] },
];
flatMapDeep(users, { active: [false] });
// Result: [true, true] (matching result of elements with active array containing [false])
```

#### Parameters

- `collection` (`object | null | undefined`): The collection to iterate over. Can be an array, object, or string.
- `iteratee` (`ListIterator | ObjectIterator | string | object`, optional): The iteratee to apply to each element. Can be a function, property name, or partial object.

#### Returns

(`any[]`): Returns a new array recursively flattened after mapping.
