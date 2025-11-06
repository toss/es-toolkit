# xor

Creates a new array with elements that exist in only one of two arrays.

```typescript
const result = xor(arr1, arr2);
```

## Usage

### `xor(arr1, arr2)`

Use `xor` when you want to find the symmetric difference of two arrays. It returns a new array consisting of elements that exist in only one of the two arrays and not in their intersection.

```typescript
import { xor } from 'es-toolkit/array';

// Get the symmetric difference of number arrays.
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// Get the symmetric difference of string arrays.
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']
```

Duplicate elements are automatically removed.

```typescript
import { xor } from 'es-toolkit/array';

xor([1, 2, 2, 3], [3, 4, 4, 5]);
// Returns: [1, 2, 4, 5]
```

#### Parameters

- `arr1` (`readonly T[]`): The first array to compare.
- `arr2` (`readonly T[]`): The second array to compare.

#### Returns

(`T[]`): Returns a new array representing the symmetric difference of the two arrays.
