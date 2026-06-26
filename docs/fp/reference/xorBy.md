# xorBy (Functional Programming)

Creates a function that returns the symmetric difference by a mapped key. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, xorBy(secondArray, mapper));
```

::: info

Prefer the original es-toolkit [`xorBy`](../../reference/array/xorBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`xorBy` compares the values returned by `mapper` and returns values whose mapped key appears in exactly one array.

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to compare with the piped array.
- `mapper` (`(item: T) => U`): The function that returns the comparison key.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the symmetric difference by key.
