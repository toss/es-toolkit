# without

Creates an array excluding all given values using SameValueZero for equality comparisons.

This function takes an input array and returns a new array that excludes all values
specified in the additional arguments. It uses SameValueZero for equality comparisons,
meaning that it considers -0 and +0 as equal but treats NaN as unequal to itself.

## Signature

```typescript
function without<T>(array: ArrayLike<T>, ...values: T[]): T[];
```

### Parameters

- `array` (`ArrayLike<T>`): The array to filter.
- `values` (`...T[]`): The values to exclude.

### Returns

(`T[]`) A new array without the specified values.

### Throws

Does not throw explicitly but returns an empty array if the input is not a valid array or has invalid array length.

## Examples

```typescript
import { without } from 'es-toolkit/array';

// Removes the specified values from the array
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]

// Removes specified string values from the array
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']

// Handles cases where none of the specified values are in the array
without([1, 2, 3], 4, 5);
// Returns: [1, 2, 3]

// Handles cases with different types of values
without([1, '2', 3, '4'], 2, '4');
// Returns: [1, '2', 3]
```
