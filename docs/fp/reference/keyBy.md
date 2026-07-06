# keyBy (Functional Programming)

Creates a function that builds an object keyed by each value. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, keyBy(getKey));
```

::: info

Prefer the original es-toolkit [`keyBy`](../../reference/array/keyBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`keyBy` calls `getKey` for each value in the piped array and returns an object whose keys are the returned keys and whose values are the original items. Later values overwrite earlier values with the same key.

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
); // => { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

#### Parameters

- `getKey` (`(item: T) => K`): The function that returns the key for each value.

#### Returns

(`(array: readonly T[]) => Record<K, T>`): A function that maps a `readonly T[]` to an object keyed by `getKey`.
