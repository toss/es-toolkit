# uniqWith

Creates a data-last uniqWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  uniqWith((a, b) => a.id === b.id)
);
```

## Usage

`uniqWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
);
// [{ id: 1 }, { id: 2 }]
```

## API

### `uniqWith(...)`

Returns: A function that accepts the piped input.
