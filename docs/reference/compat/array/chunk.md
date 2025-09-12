# chunk (Lodash Compatibility)

::: warning Use `chunk` from `es-toolkit`

This `chunk` function is slow because it needs to handle `null` and `undefined` values, default `size` values, and more.

Use the faster, modern implementation from `es-toolkit`: [chunk](../../array/chunk.md).

:::

Splits an array into smaller arrays of a specified size.

```typescript
const chunked = chunk(arr, size);
```

## Reference

### `chunk(arr, size)`

Use `chunk` when you want to divide a long array into multiple smaller arrays of equal size. If the array can't be divided evenly, the final array will contain the remaining elements.

```typescript
import { chunk } from 'es-toolkit/compat';

// Split a number array into chunks of size 2.
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// Split a string array into chunks of size 3.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

`null` and `undefined` are treated as empty arrays.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2); // []
chunk(undefined, 2); // []
```

#### Parameters

- `arr` (`ArrayLike<T>`): The array to split.
- `size` (`number`, optional): The size of each chunk. Must be an integer greater than 0. Defaults to `1`.

### Returns

(`T[][]`): Returns a two-dimensional array split into chunks of size `size`.