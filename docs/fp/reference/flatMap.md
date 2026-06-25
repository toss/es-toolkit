# flatMap

Creates a data-last flatMap operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  flatMap(value => [value, value * 10])
);
```

## Usage

`flatMap` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { flatMap, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3],
  flatMap(value => [value, value * 10])
);
// [1, 10, 2, 20, 3, 30]
```

## API

### `flatMap(...)`

Returns: A function that accepts the piped input.
