# initial (Functional Programming)

Creates a function that returns all values except the last one. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, initial());
```

::: info

Prefer the original es-toolkit [`initial`](../../reference/array/initial.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`initial` returns a new array without the last value of the piped array.

```typescript
import { initial, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], initial()); // => [1, 2]
```

#### Parameters

This function takes no arguments; call it as `initial()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to all values except the last one.
