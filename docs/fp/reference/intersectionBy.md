# intersectionBy (Functional Programming)

Creates a function that keeps values by a mapped key. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, intersectionBy(secondArray, mapper));
```

::: info

Prefer the original es-toolkit [`intersectionBy`](../../reference/array/intersectionBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`intersectionBy` compares the values returned by `mapper`. Values from the piped array are kept when their mapped key appears in `secondArray`.

```typescript
import { intersectionBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionBy([2], value => (typeof value === 'number' ? value : value.id))
); // => [{ id: 2 }]
```

#### Parameters

- `secondArray` (`readonly U[]`): The array containing values whose mapped keys should be kept.
- `mapper` (`(item: T | U) => unknown`): The function that returns the comparison key.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to values whose keys are found in `secondArray`.
