# xor (Lodash Compatibility)

::: warning Use [xor](../../array/xor.md) from `es-toolkit`

This `xor` function operates slowly due to handling of `null` or `undefined`, complex duplicate calculation logic, etc.

Instead, use the faster and more modern [xor](../../array/xor.md) from `es-toolkit`.

:::

Creates a new array of elements that exist in exactly one of the multiple arrays.

```typescript
const result = xor(...arrays);
```

## Usage

### `xor(...arrays)`

Computes the symmetric difference of multiple arrays. In other words, returns elements that exist in exactly one of the given arrays. This is useful when you want to find non-overlapping unique elements when comparing two or more arrays.

```typescript
import { xor } from 'es-toolkit/compat';

// Symmetric difference of two arrays
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// Symmetric difference of three arrays
xor([1, 2], [2, 3], [4, 5]);
// Returns: [1, 3, 4, 5]

// String arrays
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']

// Providing only one array
xor([1, 2, 3]);
// Returns: [1, 2, 3]
```

`null`, `undefined`, or empty arrays are ignored and only valid arrays are processed.

```typescript
import { xor } from 'es-toolkit/compat';

xor([1, 2], null, [2, 3]);
// Returns: [1, 3]

xor([], [1, 2], [2, 3]);
// Returns: [1, 3]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to compute the symmetric difference from. `null` or `undefined` are ignored.

#### Returns

(`T[]`): Returns a new array of elements that exist in exactly one of the arrays.
