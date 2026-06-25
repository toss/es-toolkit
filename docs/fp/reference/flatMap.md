# flatMap (Functional Programming)

Creates a function that maps each value to an array and flattens the result by one level. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flatMap(callback));
```

::: info

Prefer the original es-toolkit [`flatMap`](../../reference/array/flatMap.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`flatMap` calls `callback` for each value in the piped array and concatenates the returned arrays. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { flatMap, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  flatMap(value => [value, value * 10])
); // => [1, 10, 2, 20, 3, 30]
```

#### Parameters

- `callback` (`(value: T, index: number) => U[]`): The function that maps each value to an array.

#### Returns

(`(array: readonly T[]) => U[]`): A function that maps a `readonly T[]` to a flattened array of callback results.
