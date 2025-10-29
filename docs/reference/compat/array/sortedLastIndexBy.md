# sortedLastIndexBy (Lodash compatibility)

::: warning Implement binary search and transformation function directly

This `sortedLastIndexBy` function operates slowly due to complex iteratee handling and type conversion.

Instead, implement faster, more modern binary search and transformation functions directly.

:::

Finds the highest index at which a value should be inserted into a sorted array after applying a transformation function.

```typescript
const index = sortedLastIndexBy(array, value, iteratee);
```

## Reference

### `sortedLastIndexBy(array, value, iteratee)`

Use `sortedLastIndexBy` to find the highest insertion position of a value in a sorted array after applying a transformation function. When duplicate values exist, it returns the index after the last value.

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

// Find last insertion position in object array sorted by property
const objects = [{ x: 4 }, { x: 5 }, { x: 5 }];
sortedLastIndexBy(objects, { x: 5 }, 'x');
// Returns 3 (position after the last x: 5)

// Transform using function
const numbers = [10, 20, 20, 30];
sortedLastIndexBy(numbers, 20, n => n);
// Returns 3
```

For `null` or `undefined` arrays, returns 0.

```typescript
import { sortedLastIndexBy } from 'es-toolkit/compat';

sortedLastIndexBy(null, { x: 1 }, 'x'); // 0
sortedLastIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to insert.
- `iteratee` (optional): The transformation function, property name, or property-value array to apply to each element and value.

#### Returns

(`number`): Returns the highest index to insert the value. If the array is `null` or `undefined`, returns 0.
