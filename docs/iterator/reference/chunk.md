# chunk

Lazily groups the elements of an iterator into arrays of the given length.

```typescript
const chunks = chunk(source, size);
```

## Usage

### `chunk(source, size)`

Use `chunk` when you want to process a stream of elements in fixed-size batches — for example, saving records to a database 100 at a time. Each chunk is produced only when requested, so it works with infinite iterators when bounded by a short-circuiting helper such as the native `take`. The final chunk holds the remaining elements when the source length is not an exact multiple of `size`, so it may be shorter.

```typescript
import { chunk } from 'es-toolkit/iterator';

// Group elements into pairs; the leftover element forms a shorter final chunk.
chunk([1, 2, 3, 4, 5].values(), 2).toArray();
// Returns: [[1, 2], [3, 4], [5]]

// Process an infinite source in batches, bounded by take.
chunk(sensorReadings(), 100).take(2).toArray();
// Returns: the first two batches of 100 readings
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to split into chunks.
- `size` (`number`): The length of each chunk; must be an integer greater than zero.

#### Returns

(`IteratorObject<T[], undefined>`): A lazy iterator over arrays of up to `size` elements. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

#### Throws

Throws an error if `size` is not an integer greater than zero.

### `chunk(size)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes only `size` and returns a function that takes the iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// Returns: [[1, 2], [3, 4], [5]]
```
