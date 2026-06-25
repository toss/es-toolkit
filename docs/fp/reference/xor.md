# xor (Functional Programming)

Creates a function that returns values that appear in exactly one of two arrays. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, xor(secondArray));
```

::: info

Prefer the original es-toolkit [`xor`](../../reference/array/xor.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`xor` returns the symmetric difference of the piped array and `secondArray`, without duplicate values.

```typescript
import { pipe, xor } from 'es-toolkit/fp';

pipe([1, 2, 3], xor([2, 3, 4])); // => [1, 4]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to compare with the piped array.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the symmetric difference.
