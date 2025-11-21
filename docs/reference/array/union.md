# union

Creates a new array containing all unique elements from two arrays.

```typescript
const unified = union(arr1, arr2);
```

## Usage

### `union(arr1, arr2)`

Use `union` when you want to combine all elements from multiple arrays without duplicates. It merges two arrays and returns a new array with duplicate values removed.

```typescript
import { union } from 'es-toolkit/array';

// Get the union of number arrays.
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
union(array1, array2);
// Returns: [1, 2, 3, 4, 5]

// Get the union of string arrays.
const fruits1 = ['apple', 'banana'];
const fruits2 = ['banana', 'orange'];
union(fruits1, fruits2);
// Returns: ['apple', 'banana', 'orange']
```

Elements from the first array come first, followed by unique elements from the second array.

```typescript
import { union } from 'es-toolkit/array';

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];
union(arr1, arr2);
// Returns: [1, 2, 3, 4, 5]
// 1, 2, 3 are from arr1, 4, 5 are from arr2.
```

#### Parameters

- `arr1` (`T[]`): The first array to merge.
- `arr2` (`T[]`): The second array to merge.

#### Returns

(`T[]`): Returns a new array containing all unique elements from both arrays.
