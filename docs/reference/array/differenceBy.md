# differenceBy

Transforms elements of two arrays with a conversion function, computes their difference, and returns a new array.

```typescript
const result = differenceBy(firstArr, secondArr, mapper);
```

## Reference

### `differenceBy(firstArr, secondArr, mapper)`

Use `differenceBy` when you want to compute the difference between two arrays based on a specific criterion. It compares each element after transforming it with the conversion function, and returns the elements that exist only in the first array.

```typescript
import { differenceBy } from 'es-toolkit/array';

// Compute the difference based on the id in object arrays.
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
differenceBy(array1, array2, item => item.id);
// Returns: [{ id: 1 }, { id: 3 }]
// Elements with id 2 exist in both arrays and are excluded.

// You can compare arrays of different types.
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
differenceBy(objects, numbers, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 1 }, { id: 3 }]
```

You can also compute the difference based on string length.

```typescript
import { differenceBy } from 'es-toolkit/array';

const words1 = ['apple', 'banana', 'cherry'];
const words2 = ['kiwi', 'pear'];
differenceBy(words1, words2, word => word.length);
// Returns: ['banana', 'cherry']
// 'apple' is excluded because it has the same length as 'kiwi' or 'pear'.
```

#### Parameters

- `firstArr` (`T[]`): The base array to compute the difference from.
- `secondArr` (`U[]`): The array containing elements to exclude from the first array.
- `mapper` (`(value: T | U) => unknown`): The function that maps elements of both arrays. Elements are compared based on the values returned by this function.

#### Returns

(`T[]`): A new array containing elements that exist only in the first array, based on the transformed values.
