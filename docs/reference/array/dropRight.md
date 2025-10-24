# dropRight

Returns a new array with the specified number of elements removed from the end.

```typescript
const dropped = dropRight(arr, itemsCount);
```

## Reference

### `dropRight(arr, itemsCount)`

Use `dropRight` when you want to remove some elements from the end of an array. It removes the specified number of elements from the end and returns a new array with the remaining elements.

```typescript
import { dropRight } from 'es-toolkit/array';

// Remove the last 2 elements from the array.
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// If the count is greater than the array length, it returns an empty array.
dropRight([1, 2, 3], 5);
// Returns: []
```

If you pass a negative number or 0, it returns a new array with the same elements as the original.

```typescript
import { dropRight } from 'es-toolkit/array';

dropRight([1, 2, 3], 0); // [1, 2, 3]
dropRight([1, 2, 3], -2); // [1, 2, 3]
```

#### Parameters

- `arr` (`T[]`): The array to remove elements from.
- `itemsCount` (`number`): The number of elements to remove from the end of the array.

#### Returns

(`T[]`): A new array with the specified number of elements removed from the end.
