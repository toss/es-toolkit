# xorWith (Lodash Compatibility)

::: warning Use [xorWith](../../array/xorWith.md) from `es-toolkit`

This `xorWith` function operates slowly due to handling of `null` or `undefined`, complex duplicate calculation logic, etc.

Instead, use the faster and more modern [xorWith](../../array/xorWith.md) from `es-toolkit`.

:::

Creates a new array of elements that exist in exactly one of the multiple arrays using a comparison function.

```typescript
const result = xorWith(...arrays, comparator);
```

## Usage

### `xorWith(...arrays, comparator)`

Computes the symmetric difference of multiple arrays using a comparison function. When the comparison function returns `true`, the two elements are considered equal, and returns elements that exist in exactly one of the arrays. This is useful when dealing with complex objects or when custom comparison logic is needed.

```typescript
import { xorWith } from 'es-toolkit/compat';

// Simple number comparison
xorWith([1, 2], [2, 3], (a, b) => a === b);
// Returns: [1, 3]

// Compare object properties
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];
xorWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 2, y: 1 }, { x: 1, y: 1 }]

// Symmetric difference of three arrays
xorWith([1], [2], [3], (a, b) => a === b);
// Returns: [1, 2, 3]

// Compare by string length
xorWith(['hello'], ['world', 'hi'], (a, b) => a.length === b.length);
// Returns: ['hi']
```

If no comparison function is provided, it uses shallow equality comparison by default.

```typescript
import { xorWith } from 'es-toolkit/compat';

xorWith([1, 2], [2, 3]);
// Returns: [1, 3]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>`): The arrays to compute the symmetric difference from and the comparison function at the end. The comparison function should return `true` if two elements are equal.

#### Returns

(`T[]`): Returns a new array of elements that exist in exactly one of the arrays based on the comparison function result.
