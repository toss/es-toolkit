# chunk

Splits an array into smaller arrays of a specified size.

```typescript
const chunked = chunk(arr, size);
```

## Reference

### `chunk(arr, size)`

Use `chunk` when you want to split a long array into multiple smaller arrays of the same size. If the array cannot be evenly divided, the last chunk will contain the remaining elements.

```typescript
import { chunk } from 'es-toolkit/array';

// Split a number array into chunks of size 2.
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// Split a string array into chunks of size 3.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

Splitting an empty array returns an empty array.

```typescript
import { chunk } from 'es-toolkit/array';

chunk([], 2); // []
```

#### Parameters

- `arr` (`T[]`): The array to split.
- `size` (`number`): The size of each chunk. Must be a positive integer.

#### Returns

(`T[][]`): A 2D array split into chunks of size `size`.

#### Throws

Throws an error if `size` is not a positive integer.

## Try It

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash Compatibility

When you import `chunk` from `es-toolkit/compat`, it is compatible with lodash.

- Returns an empty array if `size` is less than 1.
- Even if you provide a number with decimals for `size`, it will be rounded down to an integer.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Runtime Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ------------------------------------------- |
| es-toolkit        | 238 bytes (92.4% smaller)           | 9,338,821 times (11% slower)                |
| es-toolkit/compat | 307 bytes (90.2% smaller)           | 9,892,157 times (5% slower)                 |
| lodash-es         | 3,153 bytes                         | 10,523,270 times                            |
