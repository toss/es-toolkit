# percentile

Calculates the value at the given percentile of an array of numbers.

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

## How it works

After sorting the array in ascending order, the result is the element at:

```typescript
const index = Math.ceil(sorted.length * (percentile / 100)) - 1;
return sorted[index];
```

This is the **nearest-rank** method. Multiplying the array length by `percentile / 100` gives a 1-indexed rank; `Math.ceil` rounds up to the smallest rank that covers at least the requested fraction of values, and subtracting `1` converts the rank into a 0-indexed array position.

For example, given a sorted array of length 100 with `percentile = 75`:

- `Math.ceil(100 * 0.75) - 1` → `74`
- The 75th-smallest value (`sorted[74]`) is returned.

`percentile = 0` is special-cased to return the smallest element, since the formula above would otherwise produce `-1`.

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
