# toFilled

Creates a new array by filling part or all of it with the specified value.

```typescript
const filled = toFilled(arr, value, start?, end?);
```

## Usage

### `toFilled(arr, value, start?, end?)`

Use `toFilled` when you want to fill a specific range of an array with a specified value. It creates and returns a new array without modifying the original array.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// Fill with '*' from index 2 to the end.
toFilled(array, '*', 2);
// Returns: [1, 2, '*', '*', '*']

// Fill with '*' from index 1 to before index 4.
toFilled(array, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]
```

If you omit the start and end positions, it fills the entire array.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

toFilled(array, '*');
// Returns: ['*', '*', '*', '*', '*']
```

You can also use negative indices. They count from the end of the array.

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// Fill with '*' from 4th from the end to before 1st from the end.
toFilled(array, '*', -4, -1);
// Returns: [1, '*', '*', '*', 5]
```

#### Parameters

- `arr` (`T[]`): The original array to base on.
- `value` (`U`): The value to fill the array with.
- `start` (`number`, optional): The start position for filling. Default is `0`.
- `end` (`number`, optional): The end position for filling. Default is the array length.

#### Returns

(`Array<T | U>`): Returns a new array with the specified range filled with the value. The original array is not modified.
