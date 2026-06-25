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

## How es-toolkit/fp functions work

Every `es-toolkit/fp` function is called with its configuration (for example `map(fn)` or `take(2)`) and returns a function that takes the data. `pipe` supplies that data, threading the result of each step into the next.

```typescript
import { map, pipe } from 'es-toolkit/fp';

const triple = map((x: number) => x * 3); // (array) => number[]

pipe([1, 2, 3], triple); // => [3, 6, 9]
```

## Lazy evaluation

When consecutive lazy-capable functions (`map`, `filter`, `take`, …) appear together, `pipe` fuses them into a single pass over the data and processes one element at a time. A trailing `take` can then end the walk early, so the earlier functions never run on the rest of the input.

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
