# uniqBy

Creates a data-last uniqBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  uniqBy(item => item.id)
);
```

## Usage

`uniqBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, uniqBy } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqBy(item => item.id)
);
// [{ id: 1 }, { id: 2 }]
```

## API

### `uniqBy(...)`

Returns: A function that accepts the piped input.
