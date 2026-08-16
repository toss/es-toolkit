# drop

Returns a new array with the specified number of elements removed from the beginning.

```typescript
const dropped = drop(arr, itemsCount);
```

## Usage

### `drop(arr, itemsCount)`

Use `drop` when you want to remove some elements from the beginning of an array. It removes the specified number of elements from the start and returns a new array with the remaining elements.

```typescript
import { drop } from 'es-toolkit/array';

// Remove the first 2 elements from the array.
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// If the count is greater than the array length, it returns an empty array.
drop([1, 2, 3], 5);
// Returns: []
```

If you pass a negative number or 0, it returns a new array with the same elements as the original.

```typescript
import { drop } from 'es-toolkit/array';

drop([1, 2, 3], 0); // [1, 2, 3]
drop([1, 2, 3], -2); // [1, 2, 3]
```

#### Parameters

- `arr` (`T[]`): The array to remove elements from.
- `itemsCount` (`number`): The number of elements to remove from the beginning of the array.

#### Returns

(`T[]`): A new array with the specified number of elements removed from the beginning.
