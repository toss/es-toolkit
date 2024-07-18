# difference

Computes the difference between two arrays.

This function takes two arrays and returns a new array containing the elements
that are present in the first array but not in the second array. It effectively
filters out any elements from the first array that also appear in the second array.

## Signature

```typescript
function difference<T>(firstArr: T[], secondArr: T[]): T[];
```

### Parameters

- `firstArr` (`T[]`): The array from which to derive the difference. This is the primary array from which elements will be compared and filtered.
- `secondArr` (`T[]`): The array containing elements to be excluded from the first array. Each element in this array will be checked against the first array, and if a match is found, that element will be excluded from the result.

### Returns

(`T[]`) A new array containing the elements that are present in the first array but not
in the second array.

## Examples

```typescript
import { difference } from 'es-toolkit/array';

const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const result = difference(array1, array2);
// result will be [1, 3, 5] since 2 and 4 are in both arrays and are excluded from the result.
```

## Performance Comparison

|            | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ---------- | ----------------------------------- | ----------------------------------- |
| es-toolkit | 90 bytes (92.4% smaller)            | 9,317,227 times (85% faster)        |
| lodash-es  | 7,958 bytes                         | 5,030,861 times                     |