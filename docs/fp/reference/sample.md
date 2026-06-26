# sample (Functional Programming)

Creates a function that returns a random value from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, sample());
```

::: info

Prefer the original es-toolkit [`sample`](../../reference/array/sample.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`sample` returns one random value from the piped array.

```typescript
import { pipe, sample } from 'es-toolkit/fp';

const value = pipe([1, 2, 3], sample());
// value is one of 1, 2, or 3.
```

#### Parameters

This function takes no arguments; call it as `sample()`.

#### Returns

(`(array: readonly T[]) => T`): A function that maps a `readonly T[]` to one random value.
