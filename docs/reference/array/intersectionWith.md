# intersectionWith

Returns a new array containing the intersection of two arrays based on a custom comparison function.

```typescript
const result = intersectionWith(firstArr, secondArr, areItemsEqual);
```

## Reference

### `intersectionWith(firstArr, secondArr, areItemsEqual)`

Use `intersectionWith` when you want to find common elements in two arrays using a user-defined comparison function. This is useful for complex objects that are difficult to handle with simple value comparisons or when special comparison logic is needed.

```typescript
import { intersectionWith } from 'es-toolkit/array';

// Compare by object's id property
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
intersectionWith(users1, users2, (a, b) => a.id === b.id);
// Returns: [{ id: 2, name: 'jane' }]

// Can also compare different types
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3];
intersectionWith(objects, ids, (obj, id) => obj.id === id);
// Returns: [{ id: 2, name: 'banana' }]
```

Complex comparison logic can also be implemented.

```typescript
import { intersectionWith } from 'es-toolkit/array';

// Case-insensitive string comparison
const words1 = ['Apple', 'Banana'];
const words2 = ['apple', 'cherry'];
intersectionWith(words1, words2, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Apple']

// Number comparison within a range
const numbers1 = [1.1, 2.3, 3.7];
const numbers2 = [1.0, 2.5, 4.0];
intersectionWith(numbers1, numbers2, (a, b) => Math.abs(a - b) < 0.5);
// Returns: [1.1] (difference between 1.1 and 1.0 is less than 0.5)
```

#### Parameters

- `firstArr` (`readonly T[]`): The first array to compare.
- `secondArr` (`readonly U[]`): The second array to compare.
- `areItemsEqual` (`(x: T, y: U) => boolean`): A function to determine if two elements are equal. Should return `true` if equal, `false` otherwise.

#### Returns

(`T[]`): Returns a new array containing elements commonly included in both arrays based on the custom comparison function. The result consists of elements from the first array.
