# takeWhile

Lazily yields the leading elements of an iterator while a predicate holds.

```typescript
const leading = takeWhile(source, shouldContinue);
```

## Usage

### `takeWhile(source, shouldContinue)`

Use `takeWhile` when you want to stop consuming based on a condition rather than a fixed count — for example, reading measurements until the first outlier. Elements are yielded as long as `shouldContinue` returns a truthy value; iteration stops at (and excludes) the first element for which it returns a falsy value, and the remaining elements are never pulled from the source. This makes it a safe way to bound an infinite iterator. The native iterator helpers offer `take` (by count) but not a predicate-based `takeWhile`, which is why this is provided.

```typescript
import { takeWhile } from 'es-toolkit/iterator';

// Yield the leading run of small numbers.
takeWhile([1, 2, 3, 4, 1].values(), x => x < 3).toArray();
// Returns: [1, 2]

// Bound an infinite sequence with a condition.
import { iterate } from 'es-toolkit/iterator';

takeWhile(iterate(1, x => x * 2), x => x < 100).toArray();
// Returns: [1, 2, 4, 8, 16, 32, 64]
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to take elements from.
- `shouldContinue` (`(value: T, index: number) => boolean`): Called with each element and its index; iteration stops once it returns a falsy value.

#### Returns

(`IteratorObject<T, undefined>`): A lazy iterator over the leading run of matching elements. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

### `takeWhile(shouldContinue)` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator`. It takes only the predicate and returns a function that takes the iterator.

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// Returns: [1, 2]
```
