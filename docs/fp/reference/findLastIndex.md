# findLastIndex

Creates a data-last findLastIndex operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  findLastIndex(value => value % 2 === 0)
);
```

## Usage

`findLastIndex` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { findLastIndex, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  findLastIndex(value => value % 2 === 0)
);
// 3
```

## API

### `findLastIndex(...)`

Returns: A function that accepts the piped input.
