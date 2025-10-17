# unionWith

Creates a new array containing unique elements from two arrays based on a custom equality function.

```typescript
const unified = unionWith(arr1, arr2, areItemsEqual);
```

## Reference

### `unionWith(arr1, arr2, areItemsEqual)`

Use `unionWith` when you want to determine element equality by complex conditions. If the provided function returns true, the two elements are considered the same and duplicates are removed.

```typescript
import { unionWith } from 'es-toolkit/array';

// Get the union based on object id.
const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const array2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
const areItemsEqual = (a, b) => a.id === b.id;
unionWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

You can also use more complex comparison logic.

```typescript
import { unionWith } from 'es-toolkit/array';

// Get the union based on coordinates.
const points1 = [
  { x: 1, y: 2 },
  { x: 3, y: 4 }
];
const points2 = [
  { x: 3, y: 4 },
  { x: 5, y: 6 }
];
const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
unionWith(points1, points2, arePointsEqual);
// Returns: [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }]
```

Here's an example of case-insensitive string comparison.

```typescript
import { unionWith } from 'es-toolkit/array';

const words1 = ['Apple', 'banana'];
const words2 = ['BANANA', 'orange'];
const areWordsEqual = (a, b) => a.toLowerCase() === b.toLowerCase();
unionWith(words1, words2, areWordsEqual);
// Returns: ['Apple', 'orange']
// 'banana' and 'BANANA' are considered the same, so only 'Apple' from the first array remains.
```

#### Parameters

- `arr1` (`T[]`): The first array to merge.
- `arr2` (`T[]`): The second array to merge.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): A function that determines if two elements are equal. It should return `true` if they are considered equal, and `false` otherwise.

#### Returns

(`T[]`): Returns the union of the two arrays with duplicates removed based on the custom equality function.
