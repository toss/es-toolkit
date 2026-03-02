# tail

Returns a new array consisting of all elements except the first.

```typescript
const result = tail(arr);
```

## Usage

### `tail(arr)`

Use `tail` when you want to get all elements except the first from an array. If the array is empty or has only one element, it returns an empty array. It's useful when processing all elements except the first in a stack or queue.

```typescript
import { tail } from 'es-toolkit/array';

// Exclude the first element from a number array.
const numbers = [1, 2, 3, 4, 5];
tail(numbers);
// Returns: [2, 3, 4, 5]

// Exclude the first element from a string array.
const strings = ['first', 'second', 'third'];
tail(strings);
// Returns: ['second', 'third']

// An array with only one element returns an empty array.
const single = [42];
tail(single);
// Returns: []
```

It safely handles empty arrays and special cases.

```typescript
import { tail } from 'es-toolkit/array';

// An empty array returns an empty array.
const empty: number[] = [];
tail(empty);
// Returns: []

// It can also handle nested arrays.
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
tail(nested);
// Returns: [[3, 4], [5, 6]]

// It can also handle object arrays.
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
tail(users);
// Returns: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to exclude the first element.

#### Returns

(`T[]`): Returns a new array excluding the first element. If the input array is empty or has only one element, it returns an empty array.
