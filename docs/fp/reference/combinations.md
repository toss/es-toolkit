# combinations (Functional Programming)

Creates a function that returns combinations of a given size. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, combinations(size));
```

::: info

Prefer the original es-toolkit [`combinations`](../../reference/array/combinations.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`combinations` returns every way to choose `size` values from the piped array while preserving their original order in each combination.

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], combinations(2)); // => [['a', 'b'], ['a', 'c'], ['b', 'c']]
```

#### Parameters

- `size` (`number`): The number of values in each combination.

#### Returns

(`(array: readonly T[]) => T[][]`): A function that maps a `readonly T[]` to an array of combinations.

#### Throws

Throws an error if `size` is not a non-negative integer.
