# unionWith

Creates a data-last unionWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
);
```

## Usage

`unionWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, unionWith } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
);
// [{ id: 1 }, { id: 2 }, { id: 3 }]
```

## API

### `unionWith(...)`

Returns: A function that accepts the piped input.
