# product

Computes the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the input arrays.

```typescript
const tuples = product(arr1, arr2);
```

## Usage

### `product(...arrs)`

Use `product` when you want every possible combination of one element from each input array. Tuples are emitted in lexicographic order, with the rightmost array advancing fastest like the digits of an odometer.

```typescript
import { product } from 'es-toolkit/array';

// Pair every number with every letter.
product([1, 2], ['a', 'b']);
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// Generate all 3-bit binary tuples.
product([0, 1], [0, 1], [0, 1]);
// Returns: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

If any input array is empty, the product is empty. With no arguments, the result is a single empty tuple.

```typescript
import { product } from 'es-toolkit/array';

product([1, 2, 3], []); // []
product(); // [[]]
```

#### Parameters

- `arrs` (`Array<readonly T[]>`): The arrays to take the product of.

#### Returns

(`T[][]`): An array of tuples representing the Cartesian product.

## Try It

::: sandpack

```ts index.ts
import { product } from 'es-toolkit/array';

console.log(product([1, 2], ['a', 'b']));
```

:::
