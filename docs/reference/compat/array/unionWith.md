# unionWith (Lodash Compatibility)

::: warning Use [unionWith](../../array/unionWith.md) from `es-toolkit`

This `unionWith` function operates slowly due to complex processing.

Instead, use the faster and more modern [unionWith](../../array/unionWith.md) from `es-toolkit`.

:::

Merges multiple arrays and keeps only unique values using a comparison function.

```typescript
const result = unionWith(...arrays, comparator);
```

## Usage

### `unionWith(...arrays, comparator)`

Use `unionWith` when you want to merge multiple arrays and remove duplicates using a custom comparison function to create a new array containing only unique values. The order of first appearance of each value is preserved.

```typescript
import { unionWith } from 'es-toolkit/compat';

// Using a custom comparison function
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];

unionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]

// Simple equality comparison
unionWith([1, 2], [2, 3], (a, b) => a === b);
// Returns: [1, 2, 3]

// Compare by string length
unionWith(['ab', 'cd'], ['ef', 'gh', 'ab'], (a, b) => a.length === b.length);
// Returns: ['ab']
```

`null` or `undefined` arrays are ignored.

```typescript
import { unionWith } from 'es-toolkit/compat';

unionWith([1, 2], null, undefined, [3, 4], (a, b) => a === b);
// Returns: [1, 2, 3, 4]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to merge.
- `comparator` (`(a: T, b: T) => boolean`): The comparison function that determines if two values are equal.

#### Returns

(`T[]`): Returns a new array containing unique values with duplicates removed using the comparison function.
