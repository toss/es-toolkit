# findLast

Creates a data-last findLast operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  findLast(value => value % 2 === 0)
);
```

## Usage

`findLast` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { findLast, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  findLast(value => value % 2 === 0)
);
// 4
```

## API

### `findLast(...)`

Returns: A function that accepts the piped input.
