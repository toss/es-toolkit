# at

Gets the elements at specified indices from an array and returns a new array.

```typescript
const result = at(arr, indices);
```

## Reference

### `at(arr, indices)`

Use `at` when you want to select elements at specific positions from an array. You can use negative indices to select elements from the end of the array.

```typescript
import { at } from 'es-toolkit/array';

// Get elements at multiple indices from a number array.
at([10, 20, 30, 40, 50], [1, 3, 4]);
// Returns: [20, 40, 50]

// Use negative indices to get elements from the end.
at(['a', 'b', 'c', 'd'], [0, -1, -2]);
// Returns: ['a', 'd', 'c']
```

Non-integer indices are converted to integers.

```typescript
import { at } from 'es-toolkit/array';

at([1, 2, 3, 4], [1.5, 2.9]); // [2, 3]
```

#### Parameters

- `arr` (`T[]`): The array to get elements from.
- `indices` (`number[]`): An array of indices of the elements to get. Negative values count from the end of the array.

#### Returns

(`T[]`): A new array containing the elements at the specified indices.
