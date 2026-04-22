# zipIterable

Combines multiple iterables into a single iterable of tuples, pairing elements at the same index from each iterable.

```typescript
const iterable = zipIterable(iterable1, iterable2);
```

## Usage

### `zipIterable(...iterables)`

Use `zipIterable` when you want to iterate over multiple iterables simultaneously, pairing elements at the same index. Unlike `zip` from `es-toolkit/array`, this function accepts any iterable — not just arrays — and is lazy, meaning it does not consume the iterables until iterated.

It stops when the shortest iterable is exhausted.

```typescript
import { zipIterable } from 'es-toolkit/iterator';

// Pair elements from two arrays.
const result = zipIterable([1, 2, 3], ['a', 'b', 'c']);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]

// Works with any iterable, not just arrays.
const result = zipIterable(new Set(['alice', 'bob']), [90, 85]);
console.log([...result]); // [['alice', 90], ['bob', 85]]
```

If the iterables are of different lengths, the result stops at the shortest one.

```typescript
import { zipIterable } from 'es-toolkit/iterator';

const result = zipIterable([1, 2, 3], ['a', 'b']);
console.log([...result]); // [[1, 'a'], [2, 'b']]
```

### Differences from `zip` in `es-toolkit/array`

| | `array/zip` | `iterator/zipIterable` |
| --- | --- | --- |
| Input | `Array` only | Any `Iterable` |
| Output | `Array` | `IterableIterator` (lazy) |
| Length mismatch | Pads with `undefined` | Stops at shortest |
| Memory | Allocates full array | Consumes on demand |

#### Parameters

- `iterables` (`...Iterable<T>[]`): The iterables to zip together.

#### Returns

(`IterableIterator<T[]>`): A lazy iterable iterator that yields tuples of elements at the same index.