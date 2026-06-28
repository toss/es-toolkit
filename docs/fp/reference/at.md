# at (Functional Programming)

Creates a function that returns the values at the given indices. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, at(indices));
```

::: info

Prefer the original es-toolkit [`at`](../../reference/array/at.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`at` reads values from the piped array at each index in `indices`. Negative indices count from the end, matching `Array.prototype.at`.

```typescript
import { at, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], at([0, -1])); // => ['a', 'c']
```

#### Parameters

- `indices` (`number[]`): The indices to read from the piped array.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the selected values.
