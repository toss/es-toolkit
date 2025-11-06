# sortedIndex (Lodash compatibility)

::: warning Implement binary search directly

This `sortedIndex` function operates with complexity due to handling `null`, `undefined`, and various type support.

Instead, implement a faster, more modern binary search directly or use a dedicated library.

:::

Finds the lowest index at which a value should be inserted into a sorted array.

```typescript
const index = sortedIndex(array, value);
```

## Usage

### `sortedIndex(array, value)`

Use `sortedIndex` to find the position to insert a value in a sorted array. It uses binary search to find the position quickly.

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// Find insertion position in number array
sortedIndex([30, 50], 40);
// Returns 1 (40 is positioned between 30 and 50)

// Find insertion position in string array
sortedIndex(['a', 'c'], 'b');
// Returns 1 ('b' is positioned between 'a' and 'c')

// When the same value exists, returns the first position
sortedIndex([1, 2, 2, 3], 2);
// Returns 1 (position of the first 2)
```

For `null` or `undefined` arrays, returns 0.

```typescript
import { sortedIndex } from 'es-toolkit/compat';

sortedIndex(null, 1); // 0
sortedIndex(undefined, 1); // 0
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The sorted array. Using an unsorted array can produce incorrect results.
- `value` (`T`): The value to insert.

#### Returns

(`number`): Returns the lowest index to insert the value. If the array is `null` or `undefined`, returns 0.
