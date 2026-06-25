# unzipWith

Creates a data-last unzipWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  unzipWith((a, b) => a + b)
);
```

## Usage

`unzipWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, unzipWith } from 'es-toolkit/fp';

const result = pipe(
  [
    [1, 10],
    [2, 20],
  ],
  unzipWith((a, b) => a + b)
);
// [3, 30]
```

## API

### `unzipWith(...)`

Returns: A function that accepts the piped input.
