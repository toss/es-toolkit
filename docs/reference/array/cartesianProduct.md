# cartesianProduct

Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.

```typescript
const tuples = cartesianProduct(arr1, arr2);
```

## Usage

### `cartesianProduct(...arrs)`

Use `cartesianProduct` when you want every possible combination of one element from each input array.

The function walks through the rightmost array first, picking each element in order. Once it has gone through every element of the rightmost array, it picks the next element from the array one position to its left and starts the rightmost array over from the beginning. This process repeats across every array, working from right to left.

```typescript
import { cartesianProduct } from 'es-toolkit/array';

// Pair every number with every letter.
cartesianProduct([1, 2], ['a', 'b']);
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// Generate all 3-bit binary tuples.
cartesianProduct([0, 1], [0, 1], [0, 1]);
// Returns: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

If any input array is empty, the product is empty. With no arguments, the result is a single empty tuple.

```typescript
import { cartesianProduct } from 'es-toolkit/array';

cartesianProduct([1, 2, 3], []); // []
cartesianProduct(); // [[]]
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to take the product of.

#### Returns

(`T[][]`): An array of tuples representing the Cartesian product.

## Try It

::: sandpack

```ts index.ts
import { cartesianProduct } from 'es-toolkit/array';

console.log(cartesianProduct([1, 2], ['a', 'b']));
```

:::
