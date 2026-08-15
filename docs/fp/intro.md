# es-toolkit/fp

`es-toolkit/fp` is the functional-programming entry point for es-toolkit. It lets you express a data transformation as a readable, top-to-bottom pipeline with [`pipe`](./reference/pipe.md), instead of nesting calls or juggling temporary variables.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4, 5, 6],
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2)
); // => [20, 40]
```

## Why es-toolkit/fp

- **Readable** — steps read top-to-bottom, in the order they run. No more parsing `take(map(filter(xs)))` inside-out, and no temporary variables between steps.
- **Fast** — consecutive steps are fused into a single pass: no intermediate array between steps, and the walk stops as soon as enough results are collected. See it happen in [Lazy evaluation](#lazy-evaluation) below.
- **No tradeoff** — when fusion cannot help, `pipe` runs the native array path, so it is never slower than `xs.filter().map()` — only sometimes much faster.

## How es-toolkit/fp functions work

Every `es-toolkit/fp` function is called with its configuration (for example `map(fn)` or `take(2)`) and returns a function that takes the data. `pipe` supplies that data, threading the result of each step into the next.

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

Because every step is a function still waiting for its data, `pipe` can see the whole shape of the pipeline before running it. That is the starting point for lazy evaluation.

## Lazy evaluation

Lazy evaluation is where the "fast" above comes from. When consecutive lazy-capable functions (`map`, `filter`, `take`, …) appear together, `pipe` fuses them into a single pass: instead of the whole array going through the steps one by one, each element travels through all the steps at once. No intermediate array is built between steps, and the moment the trailing `take` is satisfied, the whole walk stops.

The two panels below run the **same pipeline**. **Eager** processes the whole array at every step and allocates a new array each time. **Lazy fusion** walks one element all the way through and stops as soon as `take(2)` is satisfied — `5` and `6` are never visited, and no intermediate array is built.

<FpLazySimulation />

The larger the input and the earlier `take` fills up, the bigger this difference gets — it is the difference between touching the whole array and touching just its front:

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

pipe(
  hugeArray,
  map(expensiveTransform),
  filter(complexPredicate),
  // Stops as soon as 2 results are collected; most of `hugeArray` is never visited.
  take(2)
);
```

## Relationship to es-toolkit

`es-toolkit/fp` reuses the implementations from `es-toolkit`; it only changes how you call them — inside `pipe`. If you prefer direct calls, use [`es-toolkit`](/intro). To match Lodash call sites while migrating, use [`es-toolkit/compat`](/compat/intro).
