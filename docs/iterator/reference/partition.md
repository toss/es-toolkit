# partition

Consumes an iterator and splits its elements into two arrays by a predicate.

```typescript
const [matched, unmatched] = partition(source, predicate);
```

## Usage

### `partition(source, predicate)`

Use `partition` when you want to separate the elements of a lazy pipeline into two groups in a single pass — for example, valid and invalid records. The first array holds the elements for which `predicate` returns a truthy value, the second holds the rest, and relative order is preserved within each group. This is a terminal operation: it pulls every element, so it must not be used on an infinite iterator.

```typescript
import { partition } from 'es-toolkit/iterator';

// Split numbers into even and odd.
partition([1, 2, 3, 4].values(), x => x % 2 === 0);
// Returns: [[2, 4], [1, 3]]

// Order is preserved within each group.
partition([3, 1, 4, 1, 5, 9, 2].values(), x => x > 3);
// Returns: [[4, 5, 9], [3, 1, 1, 2]]
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to partition.
- `predicate` (`(value: T, index: number) => boolean`): Called with each element and its index; a truthy return sends the element to the first array.

#### Returns

(`[T[], T[]]`): A two-element tuple of `[matched, unmatched]` arrays.

### `partition(predicate)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator` and use it as the terminal step.

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// Returns: [[2, 4], [1, 3]]
```
