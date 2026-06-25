# flatMapDeep

Creates a data-last flatMapDeep operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  flatMapDeep(value => [[value, value]])
);
```

## Usage

`flatMapDeep` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
);
// [1, 1, 2, 2]
```

## API

### `flatMapDeep(...)`

Returns: A function that accepts the piped input.
