# dropWhile

Lazily skips the leading elements of an iterator while a predicate holds, then yields the rest.

```typescript
const rest = dropWhile(source, shouldDrop);
```

## Usage

### `dropWhile(source, shouldDrop)`

Use `dropWhile` when you want to skip a prefix of elements based on a condition rather than a fixed count — for example, skipping log lines until the first error. Elements are skipped while `shouldDrop` returns a truthy value; every element from the first failing one onward is yielded, including that element. The native iterator helpers offer `drop` (by count) but not a predicate-based `dropWhile`, which is why this is provided.

```typescript
import { dropWhile } from 'es-toolkit/iterator';

// Skip the leading run of small numbers.
dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray();
// Returns: [3, 1]

// Nothing is dropped once the first element fails the predicate.
dropWhile([5, 1, 2].values(), x => x < 3).toArray();
// Returns: [5, 1, 2]
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to drop elements from.
- `shouldDrop` (`(value: T, index: number) => boolean`): Called with each element and its index; elements are skipped while it returns a truthy value.

#### Returns

(`IteratorObject<T, undefined>`): A lazy iterator over the elements after the dropped leading run. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

### `dropWhile(shouldDrop)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes only the predicate and returns a function that takes the iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// Returns: [3, 1]
```
