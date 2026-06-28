# shuffle (Functional Programming)

Creates a function that returns a shuffled copy of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, shuffle());
```

::: info

Prefer the original es-toolkit [`shuffle`](../../reference/array/shuffle.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`shuffle` returns a new array containing the same values as the piped array in random order. It does not mutate the input array.

```typescript
import { pipe, shuffle } from 'es-toolkit/fp';

const values = pipe([1, 2, 3], shuffle());
// values contains 1, 2, and 3 in random order.
```

#### Parameters

This function takes no arguments; call it as `shuffle()`.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to a shuffled copy.
