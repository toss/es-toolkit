# zip

Lazily combines several iterators into a single iterator of tuples.

```typescript
const pairs = zip(source1, source2);
```

## Usage

### `zip(...sources)`

Use `zip` when you want to walk several sequences in lockstep — for example, pairing indices with values or names with scores. Elements at matching positions are combined into tuples, and iteration stops as soon as the **shortest** source is exhausted. Stopping at the shortest source (rather than padding to the longest, as the array [`zip`](../../reference/array/zip.md) does) is what makes it safe to combine finite and infinite iterators. When iteration ends — because a source ran out or the consumer stopped early — every source is closed via its `return` method.

```typescript
import { zip } from 'es-toolkit/iterator';

// Pair elements at matching positions.
zip([1, 2, 3].values(), ['a', 'b', 'c'].values()).toArray();
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// The shortest source bounds the result.
zip([1, 2, 3].values(), ['a', 'b'].values()).toArray();
// Returns: [[1, 'a'], [2, 'b']]

// Number an arbitrary sequence with an unbounded counter.
import { range } from 'es-toolkit/iterator';

zip(range(0, Infinity), ['a', 'b', 'c'].values()).toArray();
// Returns: [[0, 'a'], [1, 'b'], [2, 'c']]
```

#### Parameters

- `sources` (`Array<Iterator<unknown>>`): The iterators to zip together.

#### Returns

(`IteratorObject<[...], undefined>`): A lazy iterator over tuples of the paired elements, typed after the sources. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

### `zip(other)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes one other iterator and pairs the piped iterator's elements with it.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]
```
