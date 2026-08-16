# findIndex (Functional Programming)

Creates a function that returns the index of the first value that passes a test. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, findIndex(predicate));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`findIndex` returns the index of the first value in the piped array for which `predicate` returns `true`. If no value matches, it returns `-1`.

```typescript
import { findIndex, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findIndex(value => value > 2)
); // => 2
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): The function that tests each value.

#### Returns

(`(array: readonly T[]) => number`): A function that maps a `readonly T[]` to the first matching index, or `-1`.
