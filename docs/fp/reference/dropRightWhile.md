# dropRightWhile

Creates a data-last dropRightWhile operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  dropRightWhile(value => value > 2)
);
```

## Usage

`dropRightWhile` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { dropRightWhile, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  dropRightWhile(value => value > 2)
);
// [1, 2]
```

## API

### `dropRightWhile(...)`

Returns: A function that accepts the piped input.
