# unionBy

Creates a new array containing unique elements from two arrays based on values transformed by a specific function.

```typescript
const unified = unionBy(arr1, arr2, mapper);
```

## Reference

### `unionBy(arr1, arr2, mapper)`

Use `unionBy` when you want to remove duplicates based on a specific property from object arrays. Elements are treated as identical if the values returned by the `mapper` function are the same.

```typescript
import { unionBy } from 'es-toolkit/array';

// Get the union of objects based on id.
const users1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const users2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
unionBy(users1, users2, user => user.id);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

// Get the union based on the remainder when dividing by 3.
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
unionBy(nums1, nums2, x => x % 3);
// Returns: [1, 2, 3]
// 1 % 3 = 1, 2 % 3 = 2, 3 % 3 = 0,
// 4 % 3 = 1, 5 % 3 = 2, 6 % 3 = 0, so all are duplicates.
```

You can also get unions by complex criteria using custom comparison functions.

```typescript
import { unionBy } from 'es-toolkit/array';

const products1 = [
  { category: 'electronics', price: 100 },
  { category: 'books', price: 20 }
];
const products2 = [
  { category: 'electronics', price: 150 },
  { category: 'toys', price: 30 }
];

// Get the union based on category.
unionBy(products1, products2, product => product.category);
// Returns: [
//   { category: 'electronics', price: 100 },
//   { category: 'books', price: 20 },
//   { category: 'toys', price: 30 }
// ]
```

#### Parameters

- `arr1` (`T[]`): The first array to merge.
- `arr2` (`T[]`): The second array to merge.
- `mapper` (`(item: T) => U`): A function that transforms each element into a value for comparison.

#### Returns

(`T[]`): Returns the union of the two arrays with duplicates removed based on values returned by the `mapper` function.
