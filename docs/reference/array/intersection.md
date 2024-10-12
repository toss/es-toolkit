# intersection

Returns the intersection of two arrays.

This function takes two arrays and returns a new array containing the elements that are
present in both arrays. It effectively filters out any elements from the first array that
are not found in the second array.

## Signature

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### Parameters

- `firstArr` (`T[]`): The first array to compare.
- `secondArr` (`T[]`): The second array to compare.

### Returns

(`T[]`) A new array containing the elements that are present in both arrays.

## Examples

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// result will be [3, 4, 5] since these elements are in both arrays.
```

## Lodash Compatibility

Import `intersection` from `es-toolkit/compat` for full compatibility with lodash.

- `intersection` can accept multiple array-like objects to find common elements.
- `intersection` returns only unique elements

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3, 4, 4, 5];
const array2 = [2, 4];
const array3 = [4, 6];
const result = intersection(array1, array2, array3);
// The result is [4] because this only element is present in every array.

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, length: 2 };
const result2 = intersection(arrayLike1, arrayLike2);
// The result2 is [2, 3] because these elements are present in both array-like objects.
```
