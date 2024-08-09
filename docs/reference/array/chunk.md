# chunk

Splits an array into smaller arrays of a specified length.

This function takes an input array and divides it into multiple smaller arrays,
each of a specified length. If the input array cannot be evenly divided,
the final sub-array will contain the remaining elements.

## Signature

```typescript
function chunk<T>(arr: T[], size: number): T[][];
```

### Parameters

- `arr` (`T[]`): The array to be chunked into smaller arrays.
- `size` (`number`): The size of each smaller array. Must be a positive integer.

### Returns

(`T[][]`) A two-dimensional array where each sub-array has a maximum length of `size`.

### Throws

Throws an error if `size` is not a positive integer.

## Examples

```typescript
import { chunk } from 'es-toolkit/array';

// Splits an array of numbers into sub-arrays of length 2
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// Splits an array of strings into sub-arrays of length 3
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

## Demo

::: sandpack

```ts index.ts
import { chunk } from 'es-toolkit/array';

console.log(chunk([1, 2, 3, 4, 5], 2));
```

:::

## Lodash Compatibility

Import `chunk` from `es-toolkit/compat` for full compatibility with lodash.

- `chunk` does not throw when `size` less than one is given.
- `chunk` accepts fractional values, which are rounded down to the nearest integer.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0); // Returns []
```

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 238 bytes (92.4% smaller)           | 9,338,821 times (11% slower)        |
| es-toolkit/compat | 307 bytes (90.2% smaller)           | 9,892,157 times (5% slower)         |
| lodash-es         | 3,153 bytes                         | 10,523,270 times                    |
