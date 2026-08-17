# cartesianProduct (for `Iterator`s)

Lazily computes the Cartesian product of the source iterators.

```typescript
const pairs = cartesianProduct(source1, source2);
```

## Usage

### `cartesianProduct(...sources)`

Use `cartesianProduct` when you want every possible combination of elements from several sequences — for example, pairing every user with every role, or generating test cases from parameter sets. Tuples are yielded in lexicographic order: the rightmost source advances fastest, like the digits of an odometer, just as in the array [`cartesianProduct`](../../reference/array/cartesianProduct.md).

Because every source except the first is traversed many times, those sources are buffered into arrays when iteration starts. The first source is consumed lazily, one element at a time, so it may be infinite. When iteration ends — because the first source ran out, another source was empty, or the consumer stopped early — every source is closed via its `return` method.

If no sources are passed, a single empty tuple is yielded. If any source is empty, nothing is yielded.

```typescript
import { cartesianProduct, range } from 'es-toolkit/iterator';

// Pair every element of the first source with every element of the second.
cartesianProduct([1, 2].values(), ['a', 'b'].values()).toArray();
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// The rightmost source advances fastest.
cartesianProduct([0, 1].values(), [0, 1].values(), [0, 1].values()).toArray();
// Returns: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]

// The first source may be infinite; tuples are produced on demand.
cartesianProduct(range(0, Infinity), ['a', 'b'].values()).take(3).toArray();
// Returns: [[0, 'a'], [0, 'b'], [1, 'a']]
```

#### Parameters

- `sources` (`Array<Iterator<unknown>>`): The iterators to take the product of.

#### Returns

(`IteratorObject<[...], undefined>`): A lazy iterator over tuples representing the Cartesian product, typed after the sources. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

### `cartesianProduct(other)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes one other iterator and pairs every element of the piped iterator with every element of it, with the other iterator advancing fastest.

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
