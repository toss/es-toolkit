# chunk (Functional Programming)

Creates a function that splits an array into sub-arrays of a given length. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, chunk(size));
```

::: info

Prefer the original es-toolkit [`chunk`](../../reference/array/chunk.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`chunk` divides an array into sub-arrays, each of length `size`. When the array cannot be divided evenly, the final chunk holds the remaining elements.

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// A size larger than the array yields a single chunk.
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### Parameters

- `size` (`number`): The length of each chunk. Must be a positive integer.

#### Returns

(`(array: readonly T[]) => T[][]`): A function that maps a `readonly T[]` to an array of chunks.

#### Throws

Throws an error if `size` is not a positive integer.
