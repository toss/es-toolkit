# flattenDeep (Lodash Compatibility)

::: warning Use `flattenDeep` from `es-toolkit`

This `flattenDeep` function operates slowly due to handling `null` or `undefined`, `ArrayLike` type processing, and supporting various condition function formats.

Use the faster and more modern [flattenDeep](../../array/flattenDeep.md) from `es-toolkit` instead.

:::

Completely flattens an array.

```typescript
const result = flattenDeep(array);
```

## Usage

### `flattenDeep(value)`

Recursively flattens a nested array at all depths. All nesting levels are removed, returning a completely flattened one-dimensional array.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

// Completely flatten a deeply nested array
flattenDeep([1, [2, [3, [4]], 5]]);
// Result: [1, 2, 3, 4, 5]

// Completely flatten a complex nested structure
flattenDeep([1, [2, [3, [[[[4]]]]], 5]]);
// Result: [1, 2, 3, 4, 5]

// Support for mixed types
flattenDeep(['a', ['b', ['c', [['d']]]]]);
// Result: ['a', 'b', 'c', 'd']
```

Empty arrays, null, or undefined return empty arrays.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep(null); // []
flattenDeep(undefined); // []
flattenDeep([]); // []
```

Already flattened arrays are copied as-is.

```typescript
import { flattenDeep } from 'es-toolkit/compat';

flattenDeep([1, 2, 3, 4, 5]);
// Result: [1, 2, 3, 4, 5]
```

#### Parameters

- `value` (`ListOfRecursiveArraysOrValues<T> | null | undefined`): The array to completely flatten.

#### Returns

(`Array<T>`): Returns a new completely flattened array with all nesting removed.
