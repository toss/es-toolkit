# pipe (Functional Programming)

Performs left-to-right function composition, threading a value through a sequence of functions.

```typescript
const result = pipe(value, ...functions);
```

::: info

`pipe` is the composition entry point for `es-toolkit/fp`. Use it when you want to pass a value through transformations from left to right.

:::

## Usage

`pipe` is the entry point of `es-toolkit/fp`. It takes an initial `value` and applies each function to it in order, passing the result of one function as the input to the next. This reads top-to-bottom in the same order the transformation runs, which removes nesting and temporary variables.

Every `es-toolkit/fp` function returns a function that takes the data, so it slots directly into a `pipe`.

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

Any unary function works inside a `pipe`, not just es-toolkit functions.

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### Lazy evaluation

When consecutive lazy-capable functions (`map`, `filter`, `take`, …) appear together, `pipe` fuses them and processes the input element-by-element instead of building an intermediate array after every step. A trailing `take` can terminate the walk early, so the earlier functions never run on the rest of the input.

```typescript
import { filter, map, pipe, take } from 'es-toolkit/fp';

// Only the first two even squares are computed; the rest of the array is never visited.
pipe(
  [1, 2, 3, 4, 5, 6, 7, 8],
  map(x => x * x),
  filter(x => x % 2 === 0),
  take(2)
); // => [4, 16]
```

#### Parameters

- `value` (`T`): The initial value fed into the pipeline.
- `functions` (`Array<(input: any) => any>`): The functions to apply, from left to right. Each receives the output of the previous one.

#### Returns

(`unknown`): The result of applying every function to `value` in sequence. The public overloads infer the precise type from the chain.
