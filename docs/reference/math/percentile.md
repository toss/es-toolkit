# percentile

Calculates the value at the given percentile of an array of numbers.

`percentile` sorts the array in ascending order and returns the element at the nearest rank ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method)).

```typescript
const value = percentile(arr, p);
```

## Signature

```typescript
function percentile(arr: readonly number[], percentile: number): number;
```

### Parameters

- `arr` (`readonly number[]`): An array of numbers to calculate the percentile from.
- `percentile` (`number`): The percentile to compute, in the range `[0, 100]`.

### Returns

(`number`): The value at the given percentile. Returns `NaN` if the array is empty.

### Throws

Throws an `Error` if `percentile` is `NaN`, less than `0`, or greater than `100`.

## Examples

```typescript
import { percentile } from 'es-toolkit/math';

// Return the median (50th percentile) of an array
percentile([1, 2, 3, 4, 5], 50);
// Returns 3

// Compute the 75th percentile
percentile([1, 2, 3, 4, 5], 75);
// Returns 4

// Unsorted arrays are automatically sorted
percentile([50, 10, 30, 20, 40], 50);
// Returns 30

// Returns the smallest value at the 0th percentile
percentile([5, 1, 4, 2, 3], 0);
// Returns 1

// Returns NaN for an empty array
percentile([], 50);
// Returns NaN
```
