# xor (Functional Programming)

Creates a function that returns values that appear in exactly one of two arrays. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, xor(secondArray));
```

## Usage

`xor` returns the symmetric difference of the piped array and `secondArray`, without duplicate values.

```typescript
import { xor, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], xor([2, 3, 4])); // => [1, 4]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to compare with the piped array.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the symmetric difference.
