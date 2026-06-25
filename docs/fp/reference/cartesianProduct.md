# cartesianProduct (Functional Programming)

Creates a function that computes the Cartesian product with the piped array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, cartesianProduct(...arrs));
```

::: info

Prefer the original es-toolkit [`cartesianProduct`](../../reference/array/cartesianProduct.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`cartesianProduct` returns every possible tuple formed by taking one value from the piped array and one value from each configured array. The rightmost array advances fastest.

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

pipe([1, 2], cartesianProduct(['a', 'b'])); // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

pipe([], cartesianProduct(['a', 'b'])); // => []
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to include after the piped array.

#### Returns

(`(array: readonly T[]) => T[][]`): A function that maps the piped array to the Cartesian-product tuples.
