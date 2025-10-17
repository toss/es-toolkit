# max (Lodash Compatibility)

::: warning Use `Math.max`

This `max` function works slowly due to additional function calls and `null`/`undefined` handling.

Use the faster and more modern `Math.max(...array)` instead.

:::

Finds the maximum value in an array.

```typescript
const result = max(items);
```

## Reference

### `max(items?)`

Use `max` when you want to find the largest value in an array.

```typescript
import { max } from 'es-toolkit/compat';

// Maximum value in number array
max([1, 2, 3]);
// Returns: 3

max([10, 5, 8, 20]);
// Returns: 20

// Maximum value in string array (lexicographical order)
max(['a', 'b', 'c']);
// Returns: 'c'

max(['apple', 'banana', 'cherry']);
// Returns: 'cherry'

// Empty array or null/undefined
max([]);
// Returns: undefined

max(null);
// Returns: undefined

max(undefined);
// Returns: undefined
```

Negative numbers are also handled correctly.

```typescript
import { max } from 'es-toolkit/compat';

max([-1, -5, -3]);
// Returns: -1

max([0, -2, 5, -10]);
// Returns: 5
```

#### Parameters

- `items` (`ArrayLike<T> | null | undefined`, optional): The array to find the maximum value from.

#### Returns

(`T | undefined`): Returns the largest value in the array. If the array is empty or null/undefined, returns undefined.
