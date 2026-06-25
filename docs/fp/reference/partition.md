# partition

Creates a data-last partition operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  partition(value => value % 2 === 0)
);
```

## Usage

`partition` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { partition, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
);
// [[2, 4], [1, 3]]
```

## API

### `partition(...)`

Returns: A function that accepts the piped input.
