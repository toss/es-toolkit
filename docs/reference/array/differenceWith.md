# differenceWith

Computes the difference between two arrays based on a custom equality function.

This function takes two arrays and a custom comparison function. It returns a new array containing
the elements that are present in the first array but not in the second array. The comparison to determine
if elements are equal is made using the provided custom function.

## Signature

```typescript
function differenceWith<T, U>(firstArr: T[], secondArr: U[], areItemsEqual: (x: T, y: U) => boolean): T[];
```

### Parameters

- `firstArr` (`T[]`): The array from which to get the difference.
- `secondArr` (`U[]`) :The array containing elements to exclude from the first array.
- `areItemsEqual` (`(x: T, y: U) => boolean`): A function to determine if two items are equal.

### Returns

(`T[]`) A new array containing the elements from the first array that do not match any elements in the second array according to the custom equality function.

## Examples

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// result will be [{ id: 1 }, { id: 3 }] since the elements with id 2 are considered equal and are excluded from the result.

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [2, 4];
const areItemsEqual = (a, b) => a.id === b;
const result = differenceWith(array1, array2, areItemsEqual);
// result will be [{ id: 1 }, { id: 3 }] since the element with id 2 is considered equal to the second array's element and is excluded from the result.
```

## Lodash Compatibility

Import `differenceWith` from `es-toolkit/compat` for full compatibility with lodash.

- `differenceWith` can accept multiple arrays to be compared against the first array.
- `differenceWith` can accept array-like objects as arguments.
- `differenceWith` can omit the custom equality function. If omitted, the [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) algorithm will be used by default.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// Example 1: Accepting multiple arrays to be compared against the first array with a comparator
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// result will be [{ id: 1 }]

// Example 2: Accepting array-like objects as arguments with a comparator
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values, comparator);
// result will be [{ id: 1 }]

// Example 3: Omitting the custom equality function
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result = differenceWith(array, values1, values2);
// result will be [1]
```
