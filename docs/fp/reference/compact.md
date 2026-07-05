# compact (Functional Programming)

Creates a function that removes falsey values from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, compact());
```

::: info

Prefer the original es-toolkit [`compact`](../../reference/array/compact.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`compact` removes `false`, `null`, `undefined`, `0`, `-0`, `0n`, an empty string, and `NaN`. It is lazy-capable inside [`pipe`](./pipe.md), so a trailing `take` can stop the walk early.

```typescript
import { compact, pipe } from 'es-toolkit/fp';

pipe([0, 1, false, 2, '', 3], compact()); // => [1, 2, 3]
```

#### Parameters

This function takes no arguments; call it as `compact()`.

#### Returns

(`(array: readonly T[]) => Array<NotFalsey<T>>`): A function that maps a `readonly T[]` to an array without falsey values.
