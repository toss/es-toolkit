# unionBy

Creates a data-last unionBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  unionBy([{ id: 2 }, { id: 3 }], item => item.id)
);
```

## Usage

`unionBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, unionBy } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  unionBy([{ id: 2 }, { id: 3 }], item => item.id)
);
// [{ id: 1 }, { id: 2 }, { id: 3 }]
```

## API

### `unionBy(...)`

Returns: A function that accepts the piped input.
