# zipWith

Creates a new array by combining multiple arrays using a custom function.

```typescript
const result = zipWith(...arrs, combine);
```

## Usage

### `zipWith(...arrs, combine)`

Use `zipWith` when you want to combine elements at the same position from multiple arrays in a desired way. It passes elements at the same index from each array to the combine function and creates a new array from the results.

```typescript
import { zipWith } from 'es-toolkit/array';

// Add two number arrays.
zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// Concatenate strings.
zipWith(['a', 'b'], ['c', 'd'], ['e', 'f'], (a, b, c) => `${a}${b}${c}`);
// Returns: ['ace', 'bdf']
```

If the arrays have different lengths, it adjusts to the longest array's length. Empty positions in shorter arrays are passed as `undefined`.

```typescript
import { zipWith } from 'es-toolkit/array';

zipWith([1, 2], [10, 20, 30], (a, b) => (a ?? 0) + (b ?? 0));
// Returns: [11, 22, 30]
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to combine.
- `combine` (`(...items: [...T[], number]) => R`): A function that receives elements at the same index from each array, followed by the index itself, and returns a new value.

#### Returns

(`R[]`): Returns a new array consisting of results from applying the combine function.
