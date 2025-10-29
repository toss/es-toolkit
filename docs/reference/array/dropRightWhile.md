# dropRightWhile

Returns a new array with elements removed from the end while a condition is satisfied.

```typescript
const result = dropRightWhile(arr, canContinueDropping);
```

## Reference

### `dropRightWhile(arr, canContinueDropping)`

Use `dropRightWhile` when you want to remove elements from the end of an array that meet a specific condition. Starting from the end of the array, it removes elements while the condition function returns `true`, and stops when it returns `false`.

```typescript
import { dropRightWhile } from 'es-toolkit/array';

// Remove elements greater than 3 from the end.
const numbers = [1, 2, 3, 4, 5];
dropRightWhile(numbers, x => x > 3);
// Returns: [1, 2, 3]
// 4 and 5 satisfy the condition and are removed, stopping at 3 where the condition becomes false.

// Remove elements matching a specific condition from an object array.
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: false },
  { name: 'David', active: false },
];
dropRightWhile(users, user => !user.active);
// Returns: [{ name: 'Alice', active: true }, { name: 'Bob', active: true }]
```

If the array is empty or no elements satisfy the condition, it returns a new array same as the original.

```typescript
import { dropRightWhile } from 'es-toolkit/array';

dropRightWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropRightWhile([], x => true); // []
```

#### Parameters

- `arr` (`T[]`): The array to remove elements from.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): The condition function that determines whether to continue removing elements. It receives each element, its index, and the entire array, and returns true or false.

#### Returns

(`T[]`): A new array containing elements from the first element that doesn't satisfy the condition to the beginning of the array.
