# unzip

Creates a data-last unzip operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, unzip());
```

## Usage

`unzip` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, unzip } from 'es-toolkit/fp';

const result = pipe(
  [
    [1, 'a'],
    [2, 'b'],
  ],
  unzip()
);
// [[1, 2], ['a', 'b']]
```

## API

### `unzip(...)`

Returns: A function that accepts the piped input.
