# windowed

Returns a new array containing snapshots of each window as a window of specified size slides regularly along the array.

```typescript
const windows = windowed(arr, size, step?, options?);
```

## Reference

### `windowed(arr, size, step?, options?)`

Use `windowed` when you want to return an array containing snapshots as a window of specified size slides regularly along an array.

It's useful for calculating moving averages in time series data analysis, extracting n-grams from strings, or finding specific patterns in arrays. It can also be used for processing data in batch units or implementing sliding window algorithms.

```typescript
import { windowed } from 'es-toolkit/array';

// Basic usage - create windows of size 3.
const numbers = [1, 2, 3, 4, 5];
const result = windowed(numbers, 3);
console.log(result); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// Adjust window spacing by specifying step.
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const stepped = windowed(data, 3, 2);
console.log(stepped); // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]

// Can also be used with string arrays.
const words = ['a', 'b', 'c', 'd', 'e'];
const wordWindows = windowed(words, 2);
console.log(wordWindows); // [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']]
```

Use the `partialWindows` option if you want to include partial windows.

```typescript
import { windowed } from 'es-toolkit/array';

const numbers = [1, 2, 3, 4, 5, 6];

// Without partial windows (default)
const complete = windowed(numbers, 4, 3);
console.log(complete); // [[1, 2, 3, 4]]

// With partial windows
const withPartial = windowed(numbers, 4, 3, { partialWindows: true });
console.log(withPartial); // [[1, 2, 3, 4], [4, 5, 6]]
```

Each snapshot is provided in array form, and the last few arrays may have fewer elements than the specified size.

```typescript
import { windowed } from 'es-toolkit/array';

const small = [1, 2];

// When window is larger than array
console.log(windowed(small, 5)); // []
console.log(windowed(small, 5, 1, { partialWindows: true })); // [[1, 2]]
```

#### Parameters

- `arr` (`readonly T[]`): The array to create windows from.
- `size` (`number`): The size of each window. Must be an integer greater than 1.
- `step` (`number`, optional): The spacing between windows. Must be an integer greater than 1. Default is `1`.
- `options.partialWindows` (`boolean`, optional): Whether to include incomplete windows at the end of the array. Default is `false`.

#### Returns

(`T[][]`): An array of windows created with the specified size and spacing.

#### Throws

Throws an error if `size` or `step` is not a positive integer.
