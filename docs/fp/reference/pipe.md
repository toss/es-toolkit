# pipe

Performs left-to-right function composition, threading a value through a sequence of functions.

```typescript
const result = pipe(value, ...functions);
```

## Usage

`pipe` is the entry point of `es-toolkit/fp`. It takes an initial `value` and applies each function to it in order, passing the result of one function as the input to the next. This reads top-to-bottom in the same order the transformation runs, which removes nesting and temporary variables.

Every operator in `es-toolkit/fp` is data-last, so it slots directly into a `pipe`.

```typescript
import { map, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3],
  map(x => x * 3)
); // => [3, 6, 9]
```

Any unary function works inside a `pipe`, not just es-toolkit operators.

```typescript
import { pipe } from 'es-toolkit/fp';

pipe(
  '  Hello  ',
  s => s.trim(),
  s => s.toLowerCase()
); // => 'hello'
```

### Lazy evaluation

When consecutive lazy-capable operators (`map`, `filter`, `take`, …) appear together, `pipe` fuses them and processes the input element-by-element instead of building an intermediate array after every step. A trailing `take` can terminate the walk early, so the earlier operators never run on the rest of the input.

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

::: tip
During lazy evaluation, the third argument of a callback (the data array) contains only the elements processed so far, not the complete input. If you depend on the full array, transform it before the pipe or use a non-lazy step.
:::

#### Parameters

- `value` (`T`): The initial value fed into the pipeline.
- `functions` (`Array<(input: any) => any>`): The functions to apply, from left to right. Each receives the output of the previous one.

#### Returns

(`unknown`): The result of applying every function to `value` in sequence. The public overloads infer the precise type from the chain.
