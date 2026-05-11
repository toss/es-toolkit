# percentile

Calculates the value at the given percentile of an array of numbers.

`percentile` sorts the array in ascending order and returns the element at the nearest rank ([Nearest rank method](https://en.wikipedia.org/wiki/Percentile#The_nearest-rank_method)).

```typescript
const value = percentile(arr, p);
```

## Usage

### `percentile(arr, percentile)`

Use `percentile` when you want to find the value at a specific percentile of a numeric array. For example, the 50th percentile is the median, and the 75th percentile is the value below which 75% of the data falls.

```typescript
import { percentile } from 'es-toolkit/math';

// Find the median (50th percentile) of an array
const median = percentile([1, 2, 3, 4, 5], 50); // median is 3

// Find the 75th percentile
const p75 = percentile([1, 2, 3, 4, 5], 75); // p75 is 4

// Unsorted arrays are automatically sorted
const result = percentile([50, 10, 30, 20, 40], 50); // result is 30

// The 0th percentile returns the smallest value
const min = percentile([5, 1, 4, 2, 3], 0); // min is 1

// Returns NaN for an empty array
const empty = percentile([], 50); // empty is NaN
```

#### Parameters

- `arr` (`readonly number[]`): An array of numbers to calculate the percentile from.
- `percentile` (`number`): The percentile to compute, in the range `[0, 100]`.

#### Returns

(`number`): Returns the value at the given percentile. Returns `NaN` if the array is empty.

#### Throws

Throws an error if `percentile` is `NaN`, less than `0`, or greater than `100`.
