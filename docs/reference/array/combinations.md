# combinations

Returns all `r`-length combinations of elements from the input array.

```typescript
const result = combinations(arr, r);
```

## Usage

### `combinations(arr, r)`

Use `combinations` when you want every way to choose `r` items from an array, ignoring order. Tuples are emitted in lexicographic order based on the position of elements in the input array.

The total number of combinations is `n! / r! / (n - r)!` when `0 <= r <= n`, and zero when `r > n`.

```typescript
import { combinations } from 'es-toolkit/array';

// Pick 2 letters out of 4.
combinations(['A', 'B', 'C', 'D'], 2);
// Returns: [['A','B'], ['A','C'], ['A','D'], ['B','C'], ['B','D'], ['C','D']]

// Pick 3 numbers out of 4.
combinations([0, 1, 2, 3], 3);
// Returns: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
```

Elements are treated as unique by position, not by value, so duplicates in the input may produce combinations that look identical.

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 1, 2], 2);
// Returns: [[1, 1], [1, 2], [1, 2]]
```

When `r` is `0`, the result is a single empty combination. When `r` is greater than the array length, the result is an empty array.

```typescript
import { combinations } from 'es-toolkit/array';

combinations([1, 2, 3], 0); // [[]]
combinations([1, 2], 5); // []
```

#### Parameters

- `arr` (`readonly T[]`): The array to choose from.
- `r` (`number`): The length of each combination. Must be a non-negative integer.

#### Returns

(`T[][]`): An array of `r`-length combinations.

#### Throws

Throws an error if `r` is not a non-negative integer.

## Try It

::: sandpack

```ts index.ts
import { combinations } from 'es-toolkit/array';

console.log(combinations(['A', 'B', 'C', 'D'], 2));
```

:::
