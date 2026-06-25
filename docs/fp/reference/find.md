# find

Creates a data-last find operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  find(value => value > 2)
);
```

## Usage

`find` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { find, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  find(value => value > 2)
);
// 3
```

## API

### `find(...)`

Returns: A function that accepts the piped input.
