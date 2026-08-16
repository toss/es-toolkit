# dropRightWhile (Functional Programming)

Creates a function that drops trailing values while a predicate passes. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, dropRightWhile(predicate));
```

::: info

Prefer the original es-toolkit [`dropRightWhile`](../../reference/array/dropRightWhile.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`dropRightWhile` walks the piped array from the end and removes values while `predicate` returns `true`. It stops at the first value that does not pass.

```typescript
import { dropRightWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  dropRightWhile(value => value > 2)
); // => [1, 2]
```

#### Parameters

- `predicate` (`(item: T) => boolean`): The function that decides whether a trailing value should be dropped.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the values left after dropping from the end.
