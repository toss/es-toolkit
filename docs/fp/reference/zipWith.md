# zipWith (Functional Programming)

Creates a function that combines values from arrays by index. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, zipWith(...arrs, combine));
```

::: info

Prefer the original es-toolkit [`zipWith`](../../reference/array/zipWith.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`zipWith` passes values at the same index from the piped array and configured arrays to `combine`. If arrays have different lengths, missing values are passed as `undefined`.

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
); // => [11, 22]

pipe(
  [1, 2, 3],
  zipWith([10], (a, b = 0) => a + b)
); // => [11, 2, 3]
```

#### Parameters

- `arrs` (`Array<readonly unknown[]>`): The arrays to combine with the piped array.
- `combine` (`(...values: unknown[]) => R`): The function that receives values at the same index, followed by the index, and returns a new value.

#### Returns

(`(array: readonly T[]) => R[]`): A function that maps the piped array to combined values.
