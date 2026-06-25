# xorWith (Functional Programming)

Creates a function that returns the symmetric difference using a custom equality function. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, xorWith(secondArray, areItemsEqual));
```

::: info

Prefer the original es-toolkit [`xorWith`](../../reference/array/xorWith.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`xorWith` returns values that are not matched across the two arrays according to `areItemsEqual`.

```typescript
import { pipe, xorWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### Parameters

- `secondArray` (`readonly T[]`): The array to compare with the piped array.
- `areItemsEqual` (`(item: T, other: T) => boolean`): The function that decides whether two values are equal.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the symmetric difference by custom equality.
