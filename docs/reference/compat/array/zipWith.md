# zipWith (Lodash Compatibility)

::: warning Use [zipWith](../../array/zipWith.md) from `es-toolkit`

This `zipWith` function operates slowly due to additional processing for Lodash compatibility.

Instead, use the faster and more modern [zipWith](../../array/zipWith.md) from `es-toolkit`.

:::

Combines elements from multiple arrays using a combining function into a new array.

```typescript
const result = zipWith([1, 2], [3, 4], (a, b) => a + b);
// result is [4, 6].
```

## Usage

### `zipWith(...arrs, iteratee)`

Takes multiple arrays and combines elements at each index using a provided function to create a new array. If arrays have different lengths, it processes up to the length of the longest array, passing `undefined` for missing values.

```typescript
import { zipWith } from 'es-toolkit/compat';

// Add elements from two arrays
const result1 = zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// Combine elements from three arrays
const result2 = zipWith([1, 2], [3, 4], [5, 6], (a, b, c) => a + b + c);
// Returns: [9, 12]

// Arrays with different lengths
const result3 = zipWith([1, 2, 3], [4, 5], (a, b) => (a || 0) + (b || 0));
// Returns: [5, 7, 3]
```

#### Parameters

- `...arrs` (`any[][]`): The arrays to combine.
- `iteratee` (`Function`): The function to combine elements at each index.

#### Returns

(`any[]`): A new array of results from applying the combining function.
