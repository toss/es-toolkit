# take (Lodash compatibility)

::: warning Please use [take](../../array/take.md) from `es-toolkit`

This `take` function operates slowly due to additional processing for compatibility with Lodash.

Please use the faster and modern [take](../../array/take.md) from `es-toolkit` instead.

:::

Takes a specified number of elements from the beginning of an array and creates a new array.

```typescript
const result = take([1, 2, 3, 4, 5], 3);
// result becomes [1, 2, 3].
```

## Usage

### `take(array, count)`

Takes a specified number of elements from the beginning of an array and returns a new array. If `count` is greater than the array length, returns the entire array.

```typescript
import { take } from 'es-toolkit/compat';

// Basic usage
const numbers = [1, 2, 3, 4, 5];
const result1 = take(numbers, 3);
// Returns: [1, 2, 3]

// Request count greater than array length
const result2 = take(numbers, 10);
// Returns: [1, 2, 3, 4, 5] (entire array)

// Request 0 elements
const result3 = take(numbers, 0);
// Returns: []

// Handle empty array
const result4 = take([], 3);
// Returns: []

// Handle negative number
const result5 = take(numbers, -1);
// Returns: []
```

#### Parameters

- `array` (`T[]`): The array to take elements from.
- `count` (`number`): The number of elements to take. Default is 1.

#### Returns

(`T[]`): A new array containing the specified number of elements from the beginning.
