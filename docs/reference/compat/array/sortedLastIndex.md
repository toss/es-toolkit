# sortedLastIndex (Lodash compatibility)

::: warning Implement binary search directly

This `sortedLastIndex` function operates slowly due to complex binary search handling and type validation.

Instead, implement faster, more modern binary search directly.

:::

Finds the highest index at which a value should be inserted into a sorted array.

```typescript
const index = sortedLastIndex(array, value);
```

## Reference

### `sortedLastIndex(array, value)`

Use `sortedLastIndex` to find the highest position to insert a value in a sorted array. When duplicate values exist, it returns the index after the last position.

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

// Find last insertion position in array with duplicate values
sortedLastIndex([4, 5, 5, 5, 6], 5);
// Returns 4 (position after the last 5)

// Find insertion position for new value
sortedLastIndex([10, 20, 30], 25);
// Returns 3 (25 is positioned before 30)

// When value doesn't exist
sortedLastIndex([1, 2, 3], 0);
// Returns 0 (positioned at the front)
```

For `null` or `undefined` arrays, returns 0.

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

sortedLastIndex(null, 1); // 0
sortedLastIndex(undefined, 1); // 0
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to insert.

#### Returns

(`number`): Returns the highest index to insert the value. If the array is `null` or `undefined`, returns 0.
