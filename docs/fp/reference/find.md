# find (Functional Programming)

Creates a function that returns the first value that passes a test. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, find(predicate));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`find` returns the first value in the piped array for which `predicate` returns `true`. If no value matches, it returns `undefined`.

```typescript
import { find, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  find(value => value > 2)
); // => 3
```

#### Parameters

- `predicate` (`(value: T, index: number) => boolean`): The function that tests each value.

#### Returns

(`(array: readonly T[]) => T | undefined`): A function that maps a `readonly T[]` to the first matching value, or `undefined`.
