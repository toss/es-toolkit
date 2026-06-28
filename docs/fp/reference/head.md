# head (Functional Programming)

Creates a function that returns the first value of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, head());
```

::: info

Prefer the original es-toolkit [`head`](../../reference/array/head.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`head` returns the first value in the piped array. If the array is empty, it returns `undefined`.

```typescript
import { head, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], head()); // => 1

pipe([], head()); // => undefined
```

#### Parameters

This function takes no arguments; call it as `head()`.

#### Returns

(`(array: readonly T[]) => T | undefined`): A function that maps a `readonly T[]` to its first value.
