# min (Lodash Compatibility)

::: warning Use `Math.min`

This `min` function works slowly due to additional function calls and null/undefined handling.

Use the faster and more modern `Math.min(...array)` instead.

:::

Finds the minimum value in an array.

```typescript
const result = min(items);
```

## Usage

### `min(items?)`

Use `min` when you want to find the smallest value in an array.

```typescript
import { min } from 'es-toolkit/compat';

// Minimum value in number array
min([3, 1, 4, 1, 5, 9]);
// Returns: 1

min([10, 5, 8, 20]);
// Returns: 5

// Minimum value in string array (lexicographical order)
min(['c', 'a', 'b']);
// Returns: 'a'

min(['cherry', 'apple', 'banana']);
// Returns: 'apple'

// Empty array or null/undefined
min([]);
// Returns: undefined

min(null);
// Returns: undefined

min(undefined);
// Returns: undefined
```

Negative numbers are also handled correctly.

```typescript
import { min } from 'es-toolkit/compat';

min([0, -3, 2, 8, 7]);
// Returns: -3

min([-1, -5, -3]);
// Returns: -5
```

#### Parameters

- `items` (`ArrayLike<T> | null | undefined`, optional): The array to find the minimum value from.

#### Returns

(`T | undefined`): Returns the smallest value in the array. If the array is empty or null/undefined, returns undefined.
