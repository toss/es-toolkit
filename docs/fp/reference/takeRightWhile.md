# takeRightWhile (Functional Programming)

Creates a function that takes trailing values while a predicate passes. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeRightWhile(predicate));
```

::: info

Prefer the original es-toolkit [`takeRightWhile`](../../reference/array/takeRightWhile.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`takeRightWhile` walks the piped array from the end and keeps values while `predicate` returns `true`. It stops at the first value that does not pass.

```typescript
import { pipe, takeRightWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  takeRightWhile(value => value > 2)
); // => [3, 4]
```

#### Parameters

- `predicate` (`(item: T) => boolean`): The function that decides whether a trailing value should be kept.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the trailing values that pass.
