# unionBy (Functional Programming)

Creates a function that combines arrays by a mapped key without duplicates. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, unionBy(secondArray, mapper));
```

::: info

Prefer the original es-toolkit [`unionBy`](../../reference/array/unionBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`unionBy` compares the values returned by `mapper`. It keeps the first value for each mapped key from the piped array, then from `secondArray`.

```typescript
import { pipe, unionBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  unionBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to combine after the piped array.
- `mapper` (`(item: T) => U`): The function that returns the key used for uniqueness.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a union by mapped key.
