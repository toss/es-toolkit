# sortedIndexBy (Lodash compatibility)

::: warning Implement binary search and transformation function directly

This `sortedIndexBy` function operates slowly due to complex iteratee handling and type conversion.

Instead, implement faster, more modern binary search and transformation functions directly.

:::

Finds the lowest index at which a value should be inserted into a sorted array after applying a transformation function.

```typescript
const index = sortedIndexBy(array, value, iteratee);
```

## Reference

### `sortedIndexBy(array, value, iteratee)`

Use `sortedIndexBy` to find the insertion position of a value in a sorted array after applying a transformation function. It applies the transformation function to each element and the value to compare.

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

// Find insertion position in object array sorted by property
const objects = [{ x: 4 }, { x: 5 }];
sortedIndexBy(objects, { x: 4 }, 'x');
// Returns 0

// Transform using function
const numbers = [10, 20, 30];
sortedIndexBy(numbers, 25, n => n);
// Returns 2

// Transform with property-value array
const users = [{ name: 'alice' }, { name: 'bob' }];
sortedIndexBy(users, { name: 'ann' }, ['name']);
// Returns 0
```

For `null` or `undefined` arrays, returns 0.

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

sortedIndexBy(null, { x: 1 }, 'x'); // 0
sortedIndexBy(undefined, { x: 1 }, 'x'); // 0
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to insert.
- `iteratee` (optional): The transformation function, property name, or property-value array to apply to each element and value.

#### Returns

(`number`): Returns the lowest index to insert the value. If the array is `null` or `undefined`, returns 0.
