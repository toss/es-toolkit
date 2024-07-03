# without

Creates an array that excludes all specified values.

It correctly excludes `NaN`, as it compares values using [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero).

## Signature

```typescript
function without<T>(array: T[], ...values: T[]): T[];
```

### Parameters

- `array` (`T[]`): The array to exclude values.
- `values` (`...T[]`): The values to exclude.

### Returns

(`T[]`) A new array without the specified values.

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
