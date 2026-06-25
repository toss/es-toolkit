# dropRight (Functional Programming)

Creates a function that drops values from the end of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, dropRight(count));
```

::: info

Prefer the original es-toolkit [`dropRight`](../../reference/array/dropRight.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`dropRight` removes the last `count` values from the piped array.

```typescript
import { dropRight, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], dropRight(2)); // => [1, 2]
```

#### Parameters

- `count` (`number`): The number of values to drop from the end.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the remaining values.
