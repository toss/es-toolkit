# findIndex

Creates a data-last findIndex operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  findIndex(value => value > 2)
);
```

## Usage

`findIndex` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { findIndex, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  findIndex(value => value > 2)
);
// 2
```

## API

### `findIndex(...)`

Returns: A function that accepts the piped input.
