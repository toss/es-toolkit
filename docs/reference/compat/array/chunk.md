# chunk (Lodash Compatibility)

::: warning Use [`chunk`](../../array/chunk.md) from `es-toolkit`

This `chunk` function operates slower due to handling of `null`, `undefined`, and default `size` values.

For better performance and a more modern implementation, use [chunk](../../array/chunk.md) from `es-toolkit` instead.

:::

Divides an array into smaller arrays of a specified size.

```typescript
const chunked = chunk(arr, size);
```

## Reference

### `chunk(arr, size?)`

Use `chunk` when you want to split a long array into multiple smaller arrays of the same size. If the array cannot be divided evenly, the last array will contain the remaining elements.

```typescript
import { chunk } from 'es-toolkit/compat';

// Divide an array of numbers into chunks of size 2.
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// Divide an array of strings into chunks of size 3.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// When not evenly divisible
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2);
// Returns: []

chunk(undefined, 2);
// Returns: []
```

If size is 0 or negative, returns an empty array.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0);
// Returns: []

chunk([1, 2, 3], -1);
// Returns: []
```

#### Parameters

- `arr` (`ArrayLike<T> | null | undefined`): The array to divide.
- `size` (`number`, optional): The size of each smaller array. Default is `1`.

#### Returns

(`T[][]`): Returns a two-dimensional array divided by size `size`.
