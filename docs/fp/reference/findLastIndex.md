# findLastIndex (Functional Programming)

Creates a function that returns the index of the last value that passes a test. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, findLastIndex(predicate));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`findLastIndex` searches the piped array from the end and returns the index of the first value for which `predicate` returns `true`. If no value matches, it returns `-1`.

```typescript
import { findLastIndex, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findLastIndex(value => value % 2 === 0)
); // => 3
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): The function that tests each value.

#### Returns

(`(array: readonly T[]) => number`): A function that maps a `readonly T[]` to the last matching index, or `-1`.
