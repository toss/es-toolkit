# uniqWith (Functional Programming)

Creates a function that removes duplicates using a custom equality function. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, uniqWith(areItemsEqual));
```

::: info

Prefer the original es-toolkit [`uniqWith`](../../reference/array/uniqWith.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`uniqWith` keeps the first value that does not match a previously kept value according to `areItemsEqual`. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### Parameters

- `areItemsEqual` (`(item: T, other: T) => boolean`): The function that decides whether two values are equal.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a duplicate-free array by custom equality.
