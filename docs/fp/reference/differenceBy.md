# differenceBy (Functional Programming)

Creates a function that excludes values by a mapped key. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, differenceBy(secondArray, mapper));
```

::: info

Prefer the original es-toolkit [`differenceBy`](../../reference/array/differenceBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`differenceBy` compares the values returned by `mapper`. Values from the piped array are kept when their mapped key does not appear in `secondArray`.

```typescript
import { differenceBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  differenceBy([2], value => (typeof value === 'number' ? value : value.id))
); // => [{ id: 1 }]
```

#### Parameters

- `secondArray` (`readonly U[]`): The array containing values whose mapped keys should be excluded.
- `mapper` (`(item: T | U) => unknown`): The function that returns the comparison key.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to values whose keys are not found in `secondArray`.
