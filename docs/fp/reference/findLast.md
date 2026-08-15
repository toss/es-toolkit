# findLast (Functional Programming)

Creates a function that returns the last value that passes a test. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, findLast(predicate));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`findLast` searches the piped array from the end and returns the first value for which `predicate` returns `true`. If no value matches, it returns `undefined`.

```typescript
import { findLast, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findLast(value => value % 2 === 0)
); // => 4
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): The function that tests each value.

#### Returns

(`(array: readonly T[]) => T | undefined`): A function that maps a `readonly T[]` to the last matching value, or `undefined`.
