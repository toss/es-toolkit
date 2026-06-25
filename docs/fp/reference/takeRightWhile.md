# takeRightWhile

Creates a data-last takeRightWhile operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  takeRightWhile(value => value > 2)
);
```

## Usage

`takeRightWhile` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, takeRightWhile } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3, 4],
  takeRightWhile(value => value > 2)
);
// [3, 4]
```

## API

### `takeRightWhile(...)`

Returns: A function that accepts the piped input.
