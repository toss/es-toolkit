# mapValues (Lodash compatibility)

::: warning Use `mapValues` from `es-toolkit`

This `mapValues` function is relatively slow due to handling `null` or `undefined` and the `iteratee` conversion process.

Use the faster and more modern [`mapValues`](../../object/mapValues.md) from `es-toolkit` instead.

:::

Creates a new object by transforming values while keeping keys the same.

```typescript
const result = mapValues(obj, iteratee);
```

## Usage

### `mapValues(object, iteratee)`

Transforms each value in an object using the `iteratee` function to create a new object. Keys remain unchanged while only values are modified. Can handle strings, arrays, and objects. Useful for transforming or calculating data.

```typescript
import { mapValues } from 'es-toolkit/compat';

// Transform object values
const obj = { a: 1, b: 2, c: 3 };
const doubled = mapValues(obj, value => value * 2);
// Result: { a: 2, b: 4, c: 6 }

// Convert strings to uppercase
const names = { first: 'john', last: 'doe' };
const uppercased = mapValues(names, value => value.toUpperCase());
// Result: { first: 'JOHN', last: 'DOE' }

// Transform each character in a string
const str = 'abc';
const charMap = mapValues(str, char => char.toUpperCase());
// Result: { '0': 'A', '1': 'B', '2': 'C' }

// Convert array to object
const arr = [10, 20, 30];
const arrMap = mapValues(arr, (value, index) => value + index);
// Result: { '0': 10, '1': 21, '2': 32 }

// Extract values using property path
const users = {
  user1: { profile: { name: 'Alice' } },
  user2: { profile: { name: 'Bob' } },
};
const userNames = mapValues(users, 'profile.name');
// Result: { user1: 'Alice', user2: 'Bob' }
```

`null` or `undefined` are treated as empty objects.

```typescript
import { mapValues } from 'es-toolkit/compat';

mapValues(null, iteratee); // {}
mapValues(undefined, iteratee); // {}
```

#### Parameters

- `object` (`string | T[] | T | null | undefined`): The object, array, or string to transform values from.
- `iteratee` (`ValueIteratee<any>`, optional): The function, property path, or matching object to transform each value. Defaults to the `identity` function.

#### Returns

(`Record<number, T> | { [P in keyof T]: U } | Record<string, boolean> | Record<string, any> | Partial<T>`): Returns a new object with transformed values.
