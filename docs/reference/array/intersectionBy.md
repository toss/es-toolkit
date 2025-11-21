# intersectionBy

Returns the intersection of two or more arrays based on a mapping function.

```typescript
const result = intersectionBy(firstArr, secondArr, ...otherArr, mapper);
```

## Usage

### `intersectionBy(firstArr, secondArr, ...otherArr?, mapper)`

Use `intersectionBy` when you want to find common elements across two or more arrays based on a specific property or transformed value. It compares the results of applying a transformation function to each element to compute the intersection. This is useful when comparing object arrays by a specific property or when complex transformation logic is needed.

```typescript
import { intersectionBy } from 'es-toolkit/array';

// Find intersection based on object's id property
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 4, name: 'alice' },
];
intersectionBy(users1, users2, user => user.id);
// Returns: [{ id: 2, name: 'jane' }]

// Can also compare arrays of different types
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3, 4];
intersectionBy(objects, ids, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 2, name: 'banana' }]
```

Complex transformation logic can also be applied.

```typescript
import { intersectionBy } from 'es-toolkit/array';

// Compare strings after converting to lowercase
const words1 = ['Apple', 'Banana', 'Cherry'];
const words2 = ['apple', 'DATE', 'elderberry'];
intersectionBy(words1, words2, word => word.toLowerCase());
// Returns: ['Apple']

// Compare numbers after converting to absolute value
const numbers1 = [1, -2, 3, -4];
const numbers2 = [2, -3, 4, 5];
intersectionBy(numbers1, numbers2, num => Math.abs(num));
// Returns: [-2, 3, -4]
```

You can also compare three or more arrays.

```typescript
import { intersectionBy } from 'es-toolkit/array';

// Find elements that exist in all three arrays
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }];
const arr3 = [{ id: 2 }, { id: 4 }];
intersectionBy(arr1, arr2, arr3, item => item.id);
// Returns: [{ id: 2 }, { id: 3 }]
```

#### Parameters

- `firstArr` (`readonly T[]`): The first array to compare.
- `secondArr` (`readonly U[]`): The second array to compare.
- `...otherArr` (`readonly U[]`, optional): Additional arrays to compare.
- `mapper` (`(item: T | U) => unknown`): A function that transforms each element to create comparison criteria.

#### Returns

(`T[]`): Returns a new array containing elements from the first array that are present in all other arrays based on the transformed values. The result consists of elements from the first array.
