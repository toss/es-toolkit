# chain

Combines multiple iterables into a single iterable, yielding elements from each iterable in order.

```typescript
const iterable = chain(iterable1, iterable2, iterable3);
```

## Usage

### `chain(...iterables)`

Use `chain` when you want to iterate over multiple iterables sequentially without creating a new array in memory. Unlike spreading arrays with `[...arr1, ...arr2]`, `chain` is lazy — it does not consume the iterables until iterated.

```typescript
import { chain } from 'es-toolkit/iterator';

// Chain multiple arrays together.
const result = chain([1, 2, 3], [4, 5, 6]);
console.log([...result]); // [1, 2, 3, 4, 5, 6]

// Works with any iterable, not just arrays.
const result = chain(new Set([1, 2]), new Map([[3, 'a']]).keys());
console.log([...result]); // [1, 2, 3]
```

If an iterable is empty, it is skipped.

```typescript
import { chain } from 'es-toolkit/iterator';

const result = chain([], [1, 2], []);
console.log([...result]); // [1, 2]
```

#### Parameters

- `iterables` (`...Iterable<T>[]`): The iterables to chain together.

#### Returns

(`IterableIterator<T>`): A lazy iterable iterator that yields elements from each iterable in order.