# partition (Functional Programming)

Creates a function that splits values into passing and failing groups. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, partition(predicate));
```

::: info

Prefer the original es-toolkit [`partition`](../../reference/array/partition.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`partition` returns a pair of arrays. The first array contains values for which `predicate` returns `true`, and the second contains the rest.

```typescript
import { partition, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
); // => [[2, 4], [1, 3]]
```

#### Parameters

- `predicate` (`(value: T) => boolean`): The function that decides which group each value belongs to.

#### Returns

(`(array: readonly T[]) => [truthy: T[], falsy: T[]]`): A function that maps a `readonly T[]` to passing and failing arrays.
