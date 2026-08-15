# flatten (Functional Programming)

Creates a function that flattens nested arrays to a given depth. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, flatten(depth));
```

::: info

Prefer the original es-toolkit [`flatten`](../../reference/array/flatten.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`flatten` flattens the piped array up to `depth`. When `depth` is omitted, it flattens one level. It is lazy-capable for one-level flattening inside [`pipe`](./pipe.md).

```typescript
import { flatten, pipe } from 'es-toolkit/fp';

pipe([[1], [2, 3], [4]], flatten()); // => [1, 2, 3, 4]
```

#### Parameters

- `depth` (`number, optional`): The depth to flatten. Defaults to `1`.

#### Returns

(`(array: readonly T[]) => Array<FlatArray<T[], D>>`): A function that maps a nested array to a flattened array.
