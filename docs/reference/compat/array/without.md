# without (Lodash Compatibility)

::: warning Use [without](../../array/without.md) from `es-toolkit`

This `without` function operates slowly due to additional processing for Lodash compatibility.

Instead, use the faster and more modern [without](../../array/without.md) from `es-toolkit`.

:::

Creates a new array excluding specified values from an array.

```typescript
const result = without([1, 2, 3, 4, 5], 2, 4);
// result is [1, 3, 5].
```

## Usage

### `without(array, ...values)`

Returns a new array with the specified values removed from the array. The original array is not modified.

```typescript
import { without } from 'es-toolkit/compat';

// Remove multiple values from number array
const numbers = [1, 2, 3, 4, 5, 2, 4];
const result1 = without(numbers, 2, 4);
// Returns: [1, 3, 5]

// Remove values from string array
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const result2 = without(fruits, 'banana');
// Returns: ['apple', 'cherry']

// Handle empty array
const result3 = without([], 1, 2, 3);
// Returns: []
```

#### Parameters

- `array` (`T[]`): The original array to process.
- `...values` (`T[]`): The values to remove.

#### Returns

(`T[]`): A new array with the specified values removed.
