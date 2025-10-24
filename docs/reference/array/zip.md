# zip

Creates an array of tuples by bundling elements at the same index from multiple arrays.

```typescript
const zipped = zip(...arrs);
```

## Reference

### `zip(...arrs)`

Use `zip` when you want to bundle elements at the same position from multiple arrays together. It returns a new array where elements at the same index from each array are bundled into tuples.

```typescript
import { zip } from 'es-toolkit/array';

// Bundle two arrays.
zip([1, 2, 3], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// Bundle three arrays.
zip([1, 2], ['a', 'b', 'c'], [true, false]);
// Returns: [[1, 'a', true], [2, 'b', false], [undefined, 'c', undefined]]
```

If the arrays have different lengths, it adjusts to the longest array's length. Empty positions in shorter arrays are filled with `undefined`.

```typescript
import { zip } from 'es-toolkit/array';

zip([1, 2], ['a', 'b', 'c', 'd']);
// Returns: [[1, 'a'], [2, 'b'], [undefined, 'c'], [undefined, 'd']]
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to bundle.

#### Returns

(`T[][]`): Returns a new array where elements at the same index from each input array are bundled into tuples.
