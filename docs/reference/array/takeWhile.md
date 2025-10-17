# takeWhile

Creates a new array by taking elements from the beginning of the array while the condition function returns true.

```typescript
const taken = takeWhile(arr, predicate);
```

## Reference

### `takeWhile(arr, predicate)`

Use `takeWhile` when you only need elements from the beginning of an array that meet a specific condition. It stops taking elements when it encounters the first element that doesn't meet the condition.

```typescript
import { takeWhile } from 'es-toolkit/array';

// Take only elements less than 3.
takeWhile([1, 2, 3, 4], x => x < 3);
// Returns: [1, 2]

// Return an empty array since there are no elements greater than 3 from the beginning.
takeWhile([1, 2, 3, 4], x => x > 3);
// Returns: []
```

It can also be used with object arrays.

```typescript
import { takeWhile } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 },
];

// Take only users under 30 years old.
takeWhile(users, user => user.age < 30);
// Returns: [{ name: 'Alice', age: 25 }]
```

#### Parameters

- `arr` (`T[]`): The array to take elements from.
- `predicate` (`(element: T) => boolean`): A condition function called for each element. Elements are taken while this function returns true.

#### Returns

(`T[]`): Returns a new array containing the elements taken from the beginning while the condition function returns true.
