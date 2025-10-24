# sortedIndexOf (Lodash compatibility)

::: warning Implement binary search directly

This `sortedIndexOf` function operates slowly due to complex binary search handling and type validation.

Instead, implement faster, more modern binary search directly or use `Array.prototype.indexOf()`.

:::

Finds the index where a value first appears in a sorted array.

```typescript
const index = sortedIndexOf(array, value);
```

## Reference

### `sortedIndexOf(array, value)`

Use `sortedIndexOf` to find the index where a specific value first appears in a sorted array. It uses binary search to find the value quickly.

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

// Find value in number array
sortedIndexOf([11, 22, 33, 44, 55], 33);
// Returns 2

// When value doesn't exist
sortedIndexOf([11, 22, 33, 44, 55], 30);
// Returns -1

// When duplicate values exist, returns the first index
sortedIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// Returns 3 (position of the first 3)

// 0 and -0 are treated as equal
sortedIndexOf([-0, 0], 0);
// Returns 0
```

Empty arrays, `null`, or `undefined` return -1.

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

sortedIndexOf([], 1); // -1
sortedIndexOf(null, 1); // -1
sortedIndexOf(undefined, 1); // -1
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to find.

#### Returns

(`number`): Returns the index where the value first appears. If the value doesn't exist, returns -1.
