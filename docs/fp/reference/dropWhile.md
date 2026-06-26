# dropWhile (Functional Programming)

Creates a function that drops leading values while a predicate passes. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, dropWhile(predicate));
```

::: info

Prefer the original es-toolkit [`dropWhile`](../../reference/array/dropWhile.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`dropWhile` walks the piped array from the beginning and removes values while `predicate` returns `true`. It is lazy-capable inside [`pipe`](./pipe.md).

```typescript
import { dropWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  dropWhile(value => value < 3)
); // => [3, 1]
```

#### Parameters

- `predicate` (`(item: T, index: number) => boolean`): The function that decides whether a leading value should be dropped.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the values left after dropping from the beginning.
