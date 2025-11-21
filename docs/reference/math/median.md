# median

Calculates the median of an array of numbers.

```typescript
const middle = median(nums);
```

## Usage

### `median(nums)`

Use `median` when you want to find the median value of an array of numbers. After sorting the array in ascending order, it finds the value located in the middle. For an array with an odd number of elements, it returns the exact middle value, and for an array with an even number of elements, it returns the average of the two middle values. If given an empty array, it returns `NaN`.

```typescript
import { median } from 'es-toolkit/math';

// Calculate the median of an array with an odd number of elements
const oddNumbers = [1, 2, 3, 4, 5];
const oddResult = median(oddNumbers);
// oddResult is 3 (the middle value in the sorted array [1, 2, 3, 4, 5])

// Calculate the median of an array with an even number of elements
const evenNumbers = [1, 2, 3, 4];
const evenResult = median(evenNumbers);
// evenResult is 2.5 ((2 + 3) / 2 = 2.5)

// Unsorted arrays are automatically sorted
const unordered = [3, 1, 4, 1, 5];
const unorderedResult = median(unordered);
// unorderedResult is 3 (the middle value after sorting to [1, 1, 3, 4, 5])

// Returns NaN for an empty array
const emptyResult = median([]);
// emptyResult is NaN
```

#### Parameters

- `nums` (`readonly number[]`): An array of numbers to calculate the median.

#### Returns

(`number`): Returns the median of all numbers in the array. Returns `NaN` if the array is empty.
