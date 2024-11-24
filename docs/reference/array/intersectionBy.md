# intersectionBy

Returns the intersection of two arrays based on a mapping function.

This function takes two arrays and a mapping function. It returns a new array containing
the elements from the first array that, when mapped using the provided function, have matching
mapped elements in the second array. It effectively filters out any elements from the first array
that do not have corresponding mapped values in the second array.

## Signature

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: U[], mapper: (item: T | U) => unknown): T[];
```

### Parameters

- `firstArr` (`T[]`): The first array to compare.
- `secondArr` (`U[]`): The second array to compare.
- `mapper` (`(item: T | U) => unknown`): A function to map the elements of both arrays for comparison.

### Returns

(`T[]`) A new array containing the elements from the first array that have corresponding mapped values in the second array.

## Examples

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// result will be [{ id: 2 }] since only this element has a matching id in both arrays.

const array1 = [
  { id: 1, name: 'jane' },
  { id: 2, name: 'amy' },
  { id: 3, name: 'michael' },
];
const array2 = [2, 4];
const mapper = item => (typeof item === 'object' ? item.id : item);
const result = intersectionBy(array1, array2, mapper);
// result will be [{ id: 2, name: 'amy' }] since only this element has a matching id that is equal to seconds array's element.
```

## Lodash Compatibility

Import `intersectionBy` from `es-toolkit/compat` for full compatibility with lodash.

- `intersectionBy` can accept multiple array-like objects to find common elements.
- `intersectionBy` can accept a property key as the iteratee.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [1.2, 2.4, 3.6];
const array2 = [2.5, 3.7];
const array3 = [2.6, 3.8];
const result = intersectionBy(array1, array2, array3, Math.floor);
// result will be [2.4, 3.6] since the common elements after applying Math.floor are 2 and 3.

const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
const result = intersectionBy(array1, array2, 'x');
// result will be [{ x: 2 }, { x: 3 }] since these elements have the same `x` property.

const arrayLike1 = { 0: 'apple', 1: 'banana', 2: 'cherry', length: 3 };
const arrayLike2 = { 0: 'banana', 1: 'cherry', 2: 'date', length: 3 };
const result = intersectionBy(arrayLike1, arrayLike2);
// result will be ['banana', 'cherry'] since these elements are common between the two array-like objects.
```
