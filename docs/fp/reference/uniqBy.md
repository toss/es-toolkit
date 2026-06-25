# uniqBy (Functional Programming)

Creates a function that removes duplicates by a mapped key. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, uniqBy(mapper));
```

::: info

Prefer the original es-toolkit [`uniqBy`](../../reference/array/uniqBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`uniqBy` keeps the first value for each key returned by `mapper`. It preserves the order of first occurrence and is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { pipe, uniqBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqBy(item => item.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### Parameters

- `mapper` (`(item: T, index: number) => U`): The function that returns the key used for uniqueness.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a duplicate-free array by key.
