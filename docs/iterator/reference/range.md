# range

Lazily yields a sequence of numbers with a fixed step.

```typescript
const numbers = range(end);
const numbers = range(start, end);
const numbers = range(start, end, step);
```

## Usage

### `range(end)` / `range(start, end)` / `range(start, end, step)`

Use `range` to generate a numeric sequence without allocating an array. With one argument it counts from `0` up to `end` (exclusive) by `1`; with two arguments it starts at `start` (inclusive); the third argument sets the step, which may be negative to count down. Unlike the array [`range`](../../reference/math/range.md) in `es-toolkit/math`, no numbers are computed until the iterator is consumed, so `range(0, Infinity)` is a practical way to write an unbounded counter.

```typescript
import { range } from 'es-toolkit/iterator';

// Count from 0 up to the end (exclusive).
range(4).toArray();
// Returns: [0, 1, 2, 3]

// Start and end.
range(1, 4).toArray();
// Returns: [1, 2, 3]

// Custom step, including negative steps.
range(0, 20, 5).toArray();
// Returns: [0, 5, 10, 15]
range(0, -4, -1).toArray();
// Returns: [0, -1, -2, -3]

// An unbounded counter, bounded by take.
range(0, Infinity).take(3).toArray();
// Returns: [0, 1, 2]
```

#### Parameters

- `start` (`number`): The starting number of the range (inclusive). Defaults to `0` when only one argument is given.
- `end` (`number`): The end number of the range (exclusive).
- `step` (`number`, optional): The step between numbers; must be a non-zero integer. Defaults to `1`.

#### Returns

(`IteratorObject<number, undefined>`): A lazy iterator over the numbers in the range. It carries every native iterator helper (`map`, `take`, `toArray`, ...) for further chaining.

#### Throws

Throws an error if `step` is not a non-zero integer.
