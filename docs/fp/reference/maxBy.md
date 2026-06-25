# maxBy (Functional Programming)

Creates a function that returns the value with the largest computed score. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, maxBy(getValue));
```

::: info

Prefer the original es-toolkit [`maxBy`](../../reference/array/maxBy.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`maxBy` calls `getValue` for each value in the piped array and returns the value with the largest result. If the array is empty, it returns `undefined`.

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ score: 10 }, { score: 30 }, { score: 20 }],
  maxBy(item => item.score)
); // => { score: 30 }
```

#### Parameters

- `getValue` (`(item: T) => number`): The function that returns the value used for comparison.

#### Returns

(`(array: readonly T[]) => T | undefined`): A function that maps a `readonly T[]` to the maximum item, or `undefined`.
