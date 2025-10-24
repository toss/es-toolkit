# sortedLastIndexOf (Lodash compatibility)

::: warning Implement binary search directly

This `sortedLastIndexOf` function operates slowly due to complex binary search handling and type validation.

Instead, implement faster, more modern binary search directly or use `Array.prototype.lastIndexOf()`.

:::

Finds the index where a value last appears in a sorted array.

```typescript
const index = sortedLastIndexOf(array, value);
```

## Reference

### `sortedLastIndexOf(array, value)`

Use `sortedLastIndexOf` to find the index where a specific value last appears in a sorted array. It uses binary search to find the value quickly.

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

// Find value in number array
sortedLastIndexOf([1, 2, 3, 4, 5], 3);
// Returns 2

// When value doesn't exist
sortedLastIndexOf([1, 2, 3, 4, 5], 6);
// Returns -1

// When duplicate values exist, returns the last index
sortedLastIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// Returns 5 (position of the last 3)

// 0 and -0 are treated as equal
sortedLastIndexOf([-0, 0], 0);
// Returns 1
```

Empty arrays, `null`, or `undefined` return -1.

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

sortedLastIndexOf([], 1); // -1
sortedLastIndexOf(null, 1); // -1
sortedLastIndexOf(undefined, 1); // -1
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to find.

#### Returns

(`number`): Returns the index where the value last appears. If the value doesn't exist, returns -1.
