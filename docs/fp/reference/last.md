# last (Functional Programming)

Creates a function that returns the last value of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, last());
```

::: info

Prefer the original es-toolkit [`last`](../../reference/array/last.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`last` returns the last value in the piped array. If the array is empty, it returns `undefined`.

```typescript
import { last, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], last()); // => 3

pipe([], last()); // => undefined
```

#### Parameters

This function takes no arguments; call it as `last()`.

#### Returns

(`(array: readonly T[]) => T | undefined`): A function that maps a `readonly T[]` to its last value.
