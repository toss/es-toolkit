# differenceBy

Computes the difference between two arrays after mapping their elements through a provided function.

This function takes two arrays and a mapper function. It returns a new array containing the elements 
that are present in the first array but not in the second array, based on the identity calculated 
by the mapper function. Essentially, it filters out any elements from the first array that, when 
mapped, match an element in the mapped version of the second array.


## Signature

```typescript
function differenceBy<T, U>(firstArr: T[], secondArr: T[], mapper: (value: T) => U): T[]
```

### Parameters

- `firstArr` (`T[]`): The primary array from which to derive the difference. 
- `secondArr` (`T[]`): The array containing elements to be excluded from the first array.
- `mapper` (`(value: T) => U`): The function to map the elements of both arrays. This function is applied to each element in both arrays, and the comparison is made based on the mapped values.

### Returns

(`T[]`) A new array containing the elements from the first array that do not have a corresponding mapped identity in the second array.

## Examples

```typescript
import { differenceBy } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = differenceBy(array1, array2, mapper);
// result will be [{ id: 1 }, { id: 3 }, { id: 5 }] since the elements with id 2 are in both arrays and are excluded from the result.
```
