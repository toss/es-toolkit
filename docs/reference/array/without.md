# without

Creates a new array excluding specific values from the array.

```typescript
const filtered = without(arr, ...values);
```

## Usage

### `without(arr, ...values)`

Use `without` when you want to remove unwanted specific values from an array. The original array is not modified, and a new array with the specified values removed is returned.

The function also provides enhanced TypeScript type inference —
when literal values are passed, the return type automatically narrows using `Exclude<T, V>`.

```
import { without } from 'es-toolkit/array';

// Remove specific values from a number array.
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]
// Type: (1 | 3 | 5)[]

// Remove specific value from a string array.
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
// Type: ('b' | 'c')[]

```

It also handles `NaN` values correctly.

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove values.
- `values` (`...V[]`): The values to remove from the array.
  When literal values are used, the return type is automatically narrowed to `Exclude<T, V>[]`.

#### Returns

(`Exclude<T, V>[]`): Returns a new array with the specified values removed.
If no specific literal values are provided, the return type falls back to `T[]`.
