# takeWhile

Creates a data-last takeWhile operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  takeWhile(value => value < 3)
);
```

## Usage

`takeWhile` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, takeWhile } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 1],
  takeWhile(value => value < 3)
);
// [1, 2]
```

## API

### `takeWhile(...)`

Returns: A function that accepts the piped input.
