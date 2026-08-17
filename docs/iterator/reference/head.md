# head

Returns the first element of an iterator, or `undefined` if it is empty.

```typescript
const first = head(source);
```

## Usage

### `head(source)`

Use `head` when you only need the first element a lazy pipeline produces. It pulls a single element and then stops, so it is safe to use on an infinite iterator.

`head` consumes the iterator rather than peeking at it: after reading the first element, the source is closed via its `return` method — matching the native `Iterator.prototype.find` — so it cannot be iterated further.

```typescript
import { head } from 'es-toolkit/iterator';

// Read the first element.
head([1, 2, 3].values());
// Returns: 1

// An empty iterator yields undefined.
head([].values());
// Returns: undefined

// Only the leading elements of a lazy chain are computed.
head([1, 2, 3, 4].values().filter(x => x % 2 === 0));
// Returns: 2
```

#### Parameters

- `source` (`Iterator<T>`): The iterator to read the first element from.

#### Returns

(`T | undefined`): The first element, or `undefined` when the iterator yields nothing.

### `head()` with `pipe`

When composing transformations with [`pipe`](../../fp/reference/pipe.md), import the curried form from `es-toolkit/fp/iterator` and use it as the terminal step.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// Returns: 2
```
