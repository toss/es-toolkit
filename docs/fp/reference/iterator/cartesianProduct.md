# cartesianProduct (for `Iterator`s)

Creates a function that lazily computes the Cartesian product of an iterator and another iterator. Use it with [`pipe`](../pipe.md).

```typescript
const result = pipe(source, cartesianProduct(other));
```

::: info

In ordinary code, prefer [`cartesianProduct`](../../../reference/iterator/cartesianProduct.md) from `es-toolkit/iterator`: `cartesianProduct(source, other)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `cartesianProduct(other)`

`cartesianProduct` takes one other iterator and returns a function that pairs every element of the piped iterator with every element of `other`, with `other` advancing fastest. `other` is read into an array when iteration starts, while the piped iterator is read lazily, so the piped iterator may be infinite.

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

// Pair every number with every letter.
pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

#### Parameters

- `other` (`Iterator<U>`): The iterator to take the product with.

#### Returns

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): A function that maps an iterator to a lazy iterator over `[element, otherElement]` pairs.
