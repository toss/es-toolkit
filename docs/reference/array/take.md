# take

Creates a new array by taking the specified number of elements from the beginning of the array.

```typescript
const taken = take(arr, count);
```

## Usage

### `take(arr, count?)`

Use `take` when you only need a few elements from the front of an array. If the requested count is greater than the array length, it returns the entire array.

```typescript
import { take } from 'es-toolkit/array';

// Take the first 3 elements.
take([1, 2, 3, 4, 5], 3);
// Returns: [1, 2, 3]

// Take the first 2 elements.
take(['a', 'b', 'c'], 2);
// Returns: ['a', 'b']
```

If you request more elements than the array has, it returns the entire array.

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

If you omit `count`, it takes only the first element.

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3]);
// Returns: [1]
```

#### Parameters

- `arr` (`T[]`): The array to take elements from.
- `count` (`number`, optional): The number of elements to take. Default is `1`.

#### Returns

(`T[]`): Returns a new array containing the first `count` elements from the array.
