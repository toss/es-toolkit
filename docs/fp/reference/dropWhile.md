# dropWhile

Creates a data-last dropWhile operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  dropWhile(value => value < 3)
);
```

## Usage

`dropWhile` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { dropWhile, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 1],
  dropWhile(value => value < 3)
);
// [3, 1]
```

## API

### `dropWhile(...)`

Returns: A function that accepts the piped input.
