# iterate (for `Iterator`s)

Creates an infinite lazy iterator by repeatedly applying a function to a seed value.

```typescript
const sequence = iterate(seed, getNext);
```

## Usage

### `iterate(seed, getNext)`

Use `iterate` to generate a sequence where each value is derived from the previous one — powers, running dates, retry delays, and so on. The sequence starts with `seed` and continues with `getNext(seed)`, `getNext(getNext(seed))`, and so on. Nothing is computed before the iterator is consumed, and `getNext` only runs as many times as values are pulled.

Because the iterator is infinite, it must be bounded by a short-circuiting helper such as the native `take` or [`takeWhile`](./takeWhile.md) before being consumed.

```typescript
import { iterate } from 'es-toolkit/iterator';

// Powers of two, bounded by take.
iterate(1, x => x * 2)
  .take(5)
  .toArray();
// Returns: [1, 2, 4, 8, 16]

// Exponential backoff delays below one minute.
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(iterate(100, x => x * 2), x => x < 60000).toArray();
// Returns: [100, 200, 400, ..., 51200]
```

#### Parameters

- `seed` (`T`): The first value of the sequence.
- `getNext` (`(value: T) => T`): Computes the next value from the current one.

#### Returns

(`IteratorObject<T, undefined>`): An infinite lazy iterator over the generated sequence. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.
