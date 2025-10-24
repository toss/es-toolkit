# uniqWith (Lodash Compatibility)

::: warning Use [uniqWith](../../array/uniqWith.md) from `es-toolkit`

This `uniqWith` function operates slowly due to handling of `null` or `undefined`, complex argument type processing, etc.

Instead, use the faster and more modern [uniqWith](../../array/uniqWith.md) from `es-toolkit`.

:::

Creates a new array of unique elements by removing duplicates using a comparison function.

```typescript
const result = uniqWith(array, comparator);
```

## Reference

### `uniqWith(array, comparator)`

Removes duplicates by comparing each element of the array with a comparison function. When the comparison function returns `true`, the two elements are considered equal, and only the first occurring element is kept. If no comparison function is provided, it uses shallow equality comparison by default.

```typescript
import { uniqWith } from 'es-toolkit/compat';

// Use without comparison function (shallow equality comparison)
uniqWith([1, 2, 2, 3]);
// Returns: [1, 2, 3]

// Remove duplicates based on odd/even criterion with custom comparison function
uniqWith([1, 2, 3, 4], (a, b) => a % 2 === b % 2);
// Returns: [1, 2]

// Remove duplicates based on property in object array
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];
uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { uniqWith } from 'es-toolkit/compat';

uniqWith(null); // []
uniqWith(undefined); // []
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to remove duplicates from.
- `comparator` (`(a: T, b: T) => boolean`, optional): The function to compare if two elements are equal. Returns `true` if they are considered equal. Default is shallow equality comparison.

#### Returns

(`T[]`): Returns a new array with duplicates removed based on the comparison function result.
