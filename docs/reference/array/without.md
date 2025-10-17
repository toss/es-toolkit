# without

Creates a new array excluding specific values from the array.

```typescript
const filtered = without(arr, ...values);
```

## Reference

### `without(arr, ...values)`

Use `without` when you want to remove unwanted specific values from an array. The original array is not modified, and a new array with the specified values removed is returned.

```typescript
import { without } from 'es-toolkit/array';

// Remove specific values from a number array.
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]

// Remove specific value from a string array.
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
```

It also handles `NaN` values correctly.

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove values.
- `values` (`...T[]`): The values to remove from the array.

#### Returns

(`T[]`): Returns a new array with the specified values removed.
