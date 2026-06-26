# intersectionWith (Functional Programming)

Creates a function that keeps values using a custom equality function. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, intersectionWith(secondArray, areItemsEqual));
```

::: info

Prefer the original es-toolkit [`intersectionWith`](../../reference/array/intersectionWith.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`intersectionWith` keeps values from the piped array when `areItemsEqual` returns `true` for at least one value in `secondArray`.

```typescript
import { intersectionWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionWith([{ id: 2 }], (a, b) => a.id === b.id)
); // => [{ id: 2 }]
```

#### Parameters

- `secondArray` (`readonly U[]`): The array containing values to compare against.
- `areItemsEqual` (`(item: T, other: U) => boolean`): The function that decides whether two values are equal.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to values matched by the comparator.
