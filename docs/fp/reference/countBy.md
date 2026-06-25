# countBy (Functional Programming)

Creates a function that counts values by a key. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, countBy(mapper));
```

::: info

Prefer the original es-toolkit [`countBy`](../../reference/array/countBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`countBy` calls `mapper` for each value in the piped array and returns an object whose keys are mapper results and whose values are counts.

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  countBy(word => word.length)
); // => { 3: 2, 5: 1 }
```

#### Parameters

- `mapper` (`(item: T) => K`): The function that returns the key used for counting.

#### Returns

(`(array: readonly T[]) => Record<K, number>`): A function that maps a `readonly T[]` to counts by key.
