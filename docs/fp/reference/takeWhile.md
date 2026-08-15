# takeWhile (Functional Programming)

Creates a function that takes leading values while a predicate passes. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeWhile(predicate));
```

::: info

Prefer the original es-toolkit [`takeWhile`](../../reference/array/takeWhile.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`takeWhile` walks the piped array from the beginning and keeps values while `predicate` returns `true`. It is lazy-capable and can stop earlier lazy operations inside [`pipe`](./pipe.md).

```typescript
import { pipe, takeWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  takeWhile(value => value < 3)
); // => [1, 2]
```

#### Parameters

- `predicate` (`(element: T, index: number) => boolean`): The function that decides whether a leading value should be kept.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the leading values that pass.
