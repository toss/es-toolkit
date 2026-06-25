# chunkBy

Creates a data-last chunkBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  chunkBy(value => value)
);
```

## Usage

`chunkBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { chunkBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 1, 2, 3, 3],
  chunkBy(value => value)
);
// [[1, 1], [2], [3, 3]]
```

## API

### `chunkBy(...)`

Returns: A function that accepts the piped input.
