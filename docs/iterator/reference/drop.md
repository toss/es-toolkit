# drop (Functional Programming)

Creates a function that lazily skips the first `count` elements of an iterator and yields the rest. Use it with [`pipe`](../../fp/reference/pipe.md).

```typescript
const result = pipe(source, drop(count));
```

::: info

In ordinary code, prefer the native [`Iterator.prototype.drop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop): `source.drop(count)`. Use this `es-toolkit/fp/iterator` variant when composing transformations with `pipe`.

:::

## Usage

### `drop(count)`

`drop` skips a fixed number of leading elements. The skipped elements are pulled from the source but never yielded; everything after them passes through lazily. To skip based on a condition instead of a count, use [`dropWhile`](./dropWhile.md). It delegates to the native `Iterator.prototype.drop`.

```typescript
import { pipe } from 'es-toolkit/fp';
import { drop, toArray } from 'es-toolkit/fp/iterator';

// Skip the first two elements.
pipe([1, 2, 3, 4, 5].values(), drop(2), toArray());
// Returns: [3, 4, 5]
```

#### Parameters

- `count` (`number`): The number of elements to skip; must be a non-negative number.

#### Returns

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): A function that maps an iterator to a lazy iterator over the remaining elements.

#### Throws

Throws a `RangeError` if `count` is negative or `NaN` (native behavior).
