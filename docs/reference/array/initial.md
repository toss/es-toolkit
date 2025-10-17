# initial

Returns a new array containing all elements except the last one.

```typescript
const result = initial(arr);
```

## Reference

### `initial(arr)`

Use `initial` when you want to get all elements except the last one from an array. If the array is empty or has only one element, it returns an empty array. This is useful when processing while excluding the end of the array.

```typescript
import { initial } from 'es-toolkit/array';

// Exclude the last element from a number array
const numbers = [1, 2, 3, 4, 5];
initial(numbers);
// Returns: [1, 2, 3, 4]

// Exclude the last element from a string array
const strings = ['a', 'b', 'c'];
initial(strings);
// Returns: ['a', 'b']

// An array with only one element returns an empty array
const single = [42];
initial(single);
// Returns: []
```

It safely handles empty arrays and special cases.

```typescript
import { initial } from 'es-toolkit/array';

// An empty array returns an empty array
const empty: number[] = [];
initial(empty);
// Returns: []

// It can also handle nested arrays
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
initial(nested);
// Returns: [[1, 2], [3, 4]]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to exclude the last element.

#### Returns

(`T[]`): Returns a new array excluding the last element. If the input array is empty or has only one element, it returns an empty array.
