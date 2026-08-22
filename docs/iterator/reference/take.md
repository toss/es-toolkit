# take (for `Iterator`s)

Creates a function that lazily yields the first `limit` elements of an iterator. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, take(limit));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.take`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take): `source.take(limit)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `take(limit)`

`take` bounds a pipeline to at most `limit` elements. Once the limit is reached, the source is closed and no further elements are pulled, which makes it the standard way to consume a finite prefix of an infinite iterator. It delegates to the native `Iterator.prototype.take`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// Only the first three elements are transformed.
pipe(
  [1, 2, 3, 4, 5].values(),
  map(x => x * 2),
  take(3),
  toArray()
);
// Returns: [2, 4, 6]
```

#### Parameters

- `limit` (`number`): The maximum number of elements to yield; must be a non-negative number.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over at most `limit` leading elements.

#### Throws

Throws a `RangeError` if `limit` is negative or `NaN` (native behavior).
