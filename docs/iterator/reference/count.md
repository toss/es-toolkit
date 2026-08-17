# count

Consumes an iterator and returns the number of elements it produces.

```typescript
const total = count(source);
```

## Usage

### `count(source)`

Use `count` when you want to know how many elements a lazy pipeline produces without collecting them. Unlike `source.toArray().length`, it counts without allocating an array. This is a terminal operation: it pulls every element, so it must not be used on an infinite iterator.

```typescript
import { count } from 'es-toolkit/iterator';

// Count the elements of an iterator.
count([1, 2, 3].values());
// Returns: 3

// Count the elements remaining after a lazy chain.
count([1, 2, 3, 4, 5].values().filter(x => x % 2 === 1));
// Returns: 3
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to count.

#### Returns

(`number`): The number of elements produced by `source`.

### `count()` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator` and use it as the terminal step.

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// Returns: 2
```
