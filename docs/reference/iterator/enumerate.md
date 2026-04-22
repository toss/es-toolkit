# enumerate

Pairs each element of an iterable with its index.

```typescript
const iterable = enumerate(iterable, start);
```

## Usage

### `enumerate(iterable, start?)`

Use `enumerate` when you need both the index and value while iterating. Unlike `Array.prototype.entries()`, this works with any iterable — not just arrays.

```typescript
import { enumerate } from 'es-toolkit/iterator';

// Pair each element with its index.
const result = enumerate(['a', 'b', 'c']);
console.log([...result]); // [[0, 'a'], [1, 'b'], [2, 'c']]

// Works with any iterable, not just arrays.
for (const [index, value] of enumerate(new Set(['x', 'y', 'z']))) {
  console.log(`${index}: ${value}`);
}
// 0: x
// 1: y
// 2: z
```

A custom starting index can be provided as the second argument.

```typescript
import { enumerate } from 'es-toolkit/iterator';

const result = enumerate(['a', 'b', 'c'], 1);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### Parameters

- `iterable` (`Iterable<T>`): The iterable to enumerate.
- `start` (`number`, optional): The starting index. Defaults to `0`.

#### Returns

(`IterableIterator<[number, T]>`): A lazy iterable iterator that yields `[index, element]` tuples.