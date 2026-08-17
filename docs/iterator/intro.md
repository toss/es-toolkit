# es-toolkit/iterator

`es-toolkit/iterator` provides lazy helpers for JavaScript iterators. Instead of building an intermediate array after every step, an iterator pipeline processes one element at a time and only does the work that is actually consumed.

```typescript
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(hugeArray.values(), x => x < 100)
  .map(expensiveTransform) // native iterator helper
  .toArray();
// `expensiveTransform` only runs on the leading elements below 100.
```

## How es-toolkit/iterator functions work

Every function takes an `Iterator` as its first argument — the value you get from `array.values()`, a generator function, a `Map`/`Set` iterator, and so on. Lazy functions return an `IteratorObject` whose prototype is the native `Iterator.prototype`, so the result carries every [native iterator helper](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator) (`map`, `filter`, `take`, `drop`, `flatMap`, `reduce`, `toArray`, ...) and chains with them seamlessly.

The module only ships what the native helpers are missing. Count-based `take` and `drop`, `map`, `filter`, and friends already exist on `Iterator.prototype`; es-toolkit adds the predicate-based, stateful, and multi-source operations on top: [`cartesianProduct`](./reference/cartesianProduct.md), [`chunk`](./reference/chunk.md), [`count`](./reference/count.md), [`dropWhile`](./reference/dropWhile.md), [`head`](./reference/head.md), [`iterate`](./reference/iterate.md), [`partition`](./reference/partition.md), [`range`](./reference/range.md), [`scan`](./reference/scan.md), [`takeWhile`](./reference/takeWhile.md), [`uniqBy`](./reference/uniqBy.md), and [`zip`](./reference/zip.md).

## Lazy evaluation and infinite sequences

No element is computed before it is requested. Combined with short-circuiting helpers such as the native `take`, this makes infinite sequences practical:

```typescript
import { iterate } from 'es-toolkit/iterator';

// Powers of two, generated on demand.
iterate(1, x => x * 2)
  .take(5)
  .toArray(); // => [1, 2, 4, 8, 16]
```

## Single-shot semantics

Like every JavaScript iterator, the results are single-shot: once consumed, they yield nothing more. When a pipeline stops early — a `take` limit is reached, a `for...of` loop `break`s, or a callback throws — the source iterator is closed via its `return` method, so `try/finally` cleanup in generator sources runs reliably.

```typescript
import { chunk } from 'es-toolkit/iterator';

function* lines() {
  const file = open('data.txt');
  try {
    yield* file.readLines();
  } finally {
    file.close(); // Runs even when the consumer stops early.
  }
}

chunk(lines(), 100).take(2).toArray();
```

## Using with pipe

Every operation is also available from `es-toolkit/fp/iterator` in a curried form for use with [`pipe`](../fp/reference/pipe.md), alongside pipe-friendly wrappers of the native helpers (`map`, `filter`, `take`, ...).

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, map, take, toArray } from 'es-toolkit/fp/iterator';

pipe(
  hugeArray.values(),
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2),
  toArray()
); // => [20, 40]
```

## Relationship to es-toolkit

The array functions in [`es-toolkit`](/intro) are the right default when the data is already an array and will be fully processed. Reach for `es-toolkit/iterator` when the input is large or infinite, when the pipeline can end early, or when the data already arrives as an iterator or generator.
