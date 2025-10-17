# intersectionBy

Returns a new array containing the intersection of two arrays based on the result of a transformation function.

```typescript
const result = intersectionBy(firstArr, secondArr, mapper);
```

## Reference

### `intersectionBy(firstArr, secondArr, mapper)`

Use `intersectionBy` when you want to find common elements in two arrays based on a specific attribute or transformed value. It compares the results of processing each element with a transformation function to find the intersection. This is useful when comparing by a specific property in object arrays or when complex transformation logic is needed.

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

#### Parameters

- `firstArr` (`readonly T[]`): The first array to compare.
- `secondArr` (`readonly U[]`): The second array to compare.
- `mapper` (`(item: T | U) => unknown`): A function that transforms each element to create comparison criteria.

#### Returns

(`T[]`): Returns a new array containing elements commonly included in both arrays based on the result of the transformation function. The result consists of elements from the first array.
