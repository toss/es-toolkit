# tail (Functional Programming)

Creates a function that returns all values except the first one. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, tail());
```

::: info

Prefer the original es-toolkit [`tail`](../../reference/array/tail.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`tail` returns a new array without the first value of the piped array.

```typescript
import { pipe, tail } from 'es-toolkit/fp';

pipe([1, 2, 3], tail()); // => [2, 3]
```

#### Parameters

This function takes no arguments; call it as `tail()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to all values except the first one.
