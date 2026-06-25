# zipWith

Creates a data-last zipWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  zipWith([10, 20], (a, b) => a + b)
);
```

## Usage

`zipWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

const result = pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
);
// [11, 22]
```

## API

### `zipWith(...)`

Returns: A function that accepts the piped input.
