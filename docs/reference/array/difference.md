# difference

Computes the difference between two arrays.

This function takes two arrays and returns a new array containing the elements 
that are present in the first array but not in the second array. It effectively 
filters out any elements from the first array that also appear in the second array.


## Signature

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

## Examples

```typescript
import { difference } from 'es-toolkit/array';

// Example usage:
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
```
