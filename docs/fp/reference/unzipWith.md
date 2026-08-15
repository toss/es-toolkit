# unzipWith (Functional Programming)

Creates a function that regroups zipped arrays and combines each position. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, unzipWith(iteratee));
```

::: info

Prefer the original es-toolkit [`unzipWith`](../../reference/array/unzipWith.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`unzipWith` collects values at the same position from grouped rows, calls `iteratee` with those values, and returns the results.

```typescript
import { pipe, unzipWith } from 'es-toolkit/fp';

pipe(
  [
    [1, 10],
    [2, 20],
  ],
  unzipWith((a, b) => a + b)
); // => [3, 30]
```

#### Parameters

- `iteratee` (`(...args: T[]) => R`): The function that combines values from the same position.

#### Returns

(`(target: readonly T[][]) => R[]`): A function that maps zipped rows to combined values by position.
