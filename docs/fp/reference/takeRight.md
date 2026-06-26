# takeRight (Functional Programming)

Creates a function that returns values from the end of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeRight(count));
```

::: info

Prefer the original es-toolkit [`takeRight`](../../reference/array/takeRight.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`takeRight` returns the last `count` values from the piped array.

```typescript
import { pipe, takeRight } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], takeRight(2)); // => [3, 4]
```

#### Parameters

- `count` (`number`): The number of values to take from the end.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the last `count` values.
