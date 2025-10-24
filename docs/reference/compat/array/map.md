# map (Lodash compatibility)

::: warning Use `Array.prototype.map`

This `map` function operates slowly due to additional features such as handling `null` or `undefined`, object iteration, and property extraction. When transforming arrays, JavaScript's built-in `Array.prototype.map` method is faster and simpler.

Instead, use the faster and more modern `Array.prototype.map`.

:::

Transforms each element of an array or object to create a new array.

```typescript
const mapped = map(collection, iteratee);
```

## Reference

### `map(collection, iteratee)`

Use `map` when you want to transform each element of an array, object, or array-like object. It executes an iteratee function on each element and returns the results as a new array.

```typescript
import { map } from 'es-toolkit/compat';

// Double each element of an array
map([1, 2, 3], x => x * 2);
// Returns: [2, 4, 6]

// Transform object values
const obj = { a: 1, b: 2 };
map(obj, (value, key) => `${key}:${value}`);
// Returns: ['a:1', 'b:2']

// Extract properties
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, 'name');
// Returns: ['John', 'Jane']
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { map } from 'es-toolkit/compat';

map(null, x => x); // []
map(undefined, x => x); // []
```

You can extract nested properties by specifying a property path as a string.

```typescript
import { map } from 'es-toolkit/compat';

const users = [{ info: { name: 'John' } }, { info: { name: 'Jane' } }];
map(users, 'info.name');
// Returns: ['John', 'Jane']
```

When passing an object, it checks if each element matches that object.

```typescript
import { map } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, { age: 30 });
// Returns: [true, false]
```

#### Parameters

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to iterate over.
- `iteratee` (`function | string | object`, optional): The function to execute on each element, a property path, or an object to match. If not provided, returns each element as is.
  - When it's a function, it's called in the form `(value, key, collection)`.
  - When it's a string, it extracts that property.
  - When it's an object, it checks if each element matches the object.

#### Returns

(`U[]`): Returns a new array of transformed values.
