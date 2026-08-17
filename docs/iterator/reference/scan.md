# scan

Lazily yields the running accumulation of an iterator, like a `reduce` that emits every intermediate result.

```typescript
const accumulated = scan(source, callback, initial);
```

## Usage

### `scan(source, callback, initial)`

Use `scan` when you need every intermediate value of a reduction, not just the final one — running totals, cumulative maxima, state machines. The `initial` value is emitted first, followed by the accumulator after each element, so an input of length `n` produces `n + 1` values. This "scan-left" behavior has no native iterator-helper equivalent.

```typescript
import { scan } from 'es-toolkit/iterator';

// Running sum, starting from the initial value.
scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray();
// Returns: [0, 1, 3, 6]

// The accumulator can have a different type than the elements.
scan(['a', 'b'].values(), (acc, x) => acc + x, '').toArray();
// Returns: ['', 'a', 'ab']
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to accumulate over.
- `callback` (`(accumulator: U, value: T, index: number) => U`): Called with the current accumulator, each element, and its index; returns the next accumulator.
- `initial` (`U`): The initial accumulator, emitted as the first value.

#### Returns

(`IteratorObject<U, undefined>`): A lazy iterator over the initial value and each successive accumulator. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

### `scan(callback, initial)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes the callback and initial value, and returns a function that takes the iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// Returns: [0, 1, 3, 6]
```
