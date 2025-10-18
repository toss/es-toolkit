# at (Lodash compatibility)

::: warning Use destructuring assignment instead

This `at` function is relatively slow due to complex path processing and handling of various argument types.

Instead, use destructuring assignment or direct property access.

:::

Returns values at specified paths of an object as an array.

```typescript
const result = at(object, ...paths);
```

## Reference

### `at(object, ...paths)`

Use `at` when you want to retrieve values from multiple paths in an object at once. It returns the values corresponding to each path as an array.

```typescript
import { at } from 'es-toolkit/compat';

// Basic usage
const object = { a: 1, b: 2, c: 3 };
const result = at(object, 'a', 'c');
// Returns: [1, 3]

// Nested objects
const nested = {
  a: {
    b: {
      c: 4,
    },
  },
  x: [1, 2, 3],
};
const result2 = at(nested, 'a.b.c', 'x[1]');
// Returns: [4, 2]

// Passing paths as an array
const paths = ['a', 'c'];
const result3 = at(object, paths);
// Returns: [1, 3]

// Non-existent paths
const result4 = at(object, 'nonexistent', 'a');
// Returns: [undefined, 1]
```

`null` or `undefined` objects return an empty array.

```typescript
import { at } from 'es-toolkit/compat';

at(null, 'a', 'b'); // []
at(undefined, 'a', 'b'); // []
```

#### Parameters

- `object` (`T | null | undefined`): The object from which to retrieve values.
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): The paths of values to retrieve. Can be passed as individual arguments or as arrays.

#### Returns

(`unknown[]`): Returns an array of values corresponding to the specified paths.
