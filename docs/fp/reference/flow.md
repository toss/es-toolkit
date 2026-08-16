# flow (Functional Programming)

Performs left-to-right function composition, returning a reusable function instead of running immediately.

```typescript
const fn = flow(...functions);
const result = fn(...args);
```

::: info

`flow` is the deferred sibling of [`pipe`](./pipe.md). Use `flow` when you want to build a reusable pipeline once and call it later with different data; use `pipe` when you already have the value and want the result right away.

:::

## Usage

`flow` takes a sequence of functions and composes them left-to-right into a single function. The first function may take any number of arguments; every later function is unary and receives the result of the previous one.

The key difference from `pipe`:

- `pipe(value, ...functions)` threads a concrete `value` through the functions **immediately** and returns the result.
- `flow(...functions)` returns a **new function** that applies the same composition whenever you call it, so you can reuse it.

```typescript
import { flow } from 'es-toolkit/fp';

const addThenSquare = flow(
  (x: number, y: number) => x + y,
  n => n * n
);

addThenSquare(1, 2); // => 9
addThenSquare(2, 3); // => 25
```

Internally `flow` delegates to `pipe`, so any `es-toolkit/fp` function (or any unary function) slots in the same way, and lazy-capable functions are fused identically.

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

const firstTwoEvenSquares = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

firstTwoEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

### Lazy evaluation

Because `flow` runs through `pipe`, consecutive lazy-capable functions (`map`, `filter`, `take`, …) are fused and processed element-by-element instead of building an intermediate array after every step. A trailing `take` can terminate the walk early, so the earlier functions never run on the rest of the input — exactly as in `pipe`.

```typescript
import { filter, flow, map, take } from 'es-toolkit/fp';

// Only the first two even squares are computed; the rest of the array is never visited.
const pipeline = flow(
  map((x: number) => x * x),
  filter(x => x % 2 === 0),
  take(2)
);

pipeline([1, 2, 3, 4, 5, 6, 7, 8]); // => [4, 16]
```

#### Parameters

- `functions` (`Array<(...args: any[]) => any>`): The functions to compose, from left to right. The first may take any number of arguments; the rest are unary, each receiving the previous function's output.

#### Returns

(`(...args: any[]) => unknown`): A new function that applies every function in sequence. It accepts the same parameters as the first function and returns the result of the last. The public overloads infer the precise types from the chain.
