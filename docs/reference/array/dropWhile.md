# dropWhile

Returns a new array with elements removed from the beginning while a condition is satisfied.

```typescript
const result = dropWhile(arr, canContinueDropping);
```

## Usage

### `dropWhile(arr, canContinueDropping)`

Use `dropWhile` when you want to remove elements from the beginning of an array that meet a specific condition. Starting from the beginning of the array, it removes elements while the condition function returns `true`, and stops when it returns `false`.

```typescript
import { dropWhile } from 'es-toolkit/array';

// Remove elements less than 3 from the beginning.
const numbers = [1, 2, 3, 4, 2, 5];
dropWhile(numbers, x => x < 3);
// Returns: [3, 4, 2, 5]
// 1 and 2 satisfy the condition and are removed, stopping at 3 where the condition becomes false.

// Remove elements matching a specific condition from an object array.
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
  { name: 'David', active: true },
];
dropWhile(users, user => !user.active);
// Returns: [{ name: 'Charlie', active: true }, { name: 'David', active: true }]
```

If the array is empty or no elements satisfy the condition, it returns a new array same as the original.

```typescript
import { dropWhile } from 'es-toolkit/array';

dropWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropWhile([], x => true); // []
```

#### Parameters

- `arr` (`T[]`): The array to remove elements from.
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): The condition function that determines whether to continue removing elements. It receives each element, its index, and the entire array, and returns true or false.

#### Returns

(`T[]`): A new array containing elements from the first element that doesn't satisfy the condition to the end of the array.
