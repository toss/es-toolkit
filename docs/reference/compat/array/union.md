# union (Lodash Compatibility)

::: warning Use [union](../../array/union.md) from `es-toolkit`

This `union` function operates slowly due to complex array processing.

Instead, use the faster and more modern [union](../../array/union.md) from `es-toolkit`.

:::

Creates a new array containing only unique values from multiple arrays.

```typescript
const result = union(...arrays);
```

## Usage

### `union(...arrays)`

Use `union` when you want to merge multiple arrays and remove duplicates to create a new array containing only unique values. The order of first appearance of each value is preserved.

```typescript
import { union } from 'es-toolkit/compat';

// Merging number arrays
union([2], [1, 2]);
// Returns: [2, 1]

// Merging multiple arrays
union([2], [1, 2], [2, 3]);
// Returns: [2, 1, 3]

// Nested arrays are not flattened
union([1, 3, 2], [1, [5]], [2, [4]]);
// Returns: [1, 3, 2, [5], [4]]

// Non-array values are ignored
union([0], 3, { '0': 1 }, null, [2, 1]);
// Returns: [0, 2, 1]

// Array-like objects are also processed
union([0], { 0: 'a', length: 1 }, [2, 1]);
// Returns: [0, 'a', 2, 1]
```

`null` or `undefined` are ignored.

```typescript
import { union } from 'es-toolkit/compat';

union([1, 2], null, undefined, [3, 4]);
// Returns: [1, 2, 3, 4]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to merge. Non-array values are ignored.

#### Returns

(`T[]`): Returns a new array containing unique values from all arrays.
