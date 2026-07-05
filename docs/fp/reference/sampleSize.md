# sampleSize (Functional Programming)

Creates a function that returns random values from an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, sampleSize(size));
```

::: info

Prefer the original es-toolkit [`sampleSize`](../../reference/array/sampleSize.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`sampleSize` returns `size` random values from the piped array without repeating the same array position.

```typescript
import { pipe, sampleSize } from 'es-toolkit/fp';

const values = pipe([1, 2, 3, 4], sampleSize(2));
// values has length 2 and contains values from the input array.
```

#### Parameters

- `size` (`number`): The number of random values to return.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to random values.

#### Throws

Throws an error if `size` is greater than the length of the piped array.
