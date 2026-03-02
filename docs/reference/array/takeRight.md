# takeRight

Creates a new array by taking the specified number of elements from the end of the array.

```typescript
const taken = takeRight(arr, count);
```

## Usage

### `takeRight(arr, count?)`

Use `takeRight` when you only need a few elements from the end of an array. If the requested count is greater than the array length, it returns the entire array.

```typescript
import { takeRight } from 'es-toolkit/array';

// Take the last 2 elements.
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// Take the last 2 elements.
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']
```

If you request more elements than the array has, it returns the entire array.

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

If you omit `count`, it takes only the last element.

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3]);
// Returns: [3]
```

#### Parameters

- `arr` (`T[]`): The array to take elements from.
- `count` (`number`, optional): The number of elements to take. Default is `1`.

#### Returns

(`T[]`): Returns a new array containing the last `count` elements from the array.
