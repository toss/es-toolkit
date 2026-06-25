# keyBy

Creates a data-last keyBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  keyBy(item => item.id)
);
```

## Usage

`keyBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { keyBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [
    { id: 'a', value: 1 },
    { id: 'b', value: 2 },
  ],
  keyBy(item => item.id)
);
// { a: { id: 'a', value: 1 }, b: { id: 'b', value: 2 } }
```

## API

### `keyBy(...)`

Returns: A function that accepts the piped input.
