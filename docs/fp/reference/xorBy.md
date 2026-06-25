# xorBy

Creates a data-last xorBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
```

## Usage

`xorBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
);
// [{ id: 1 }, { id: 3 }]
```

## API

### `xorBy(...)`

Returns: A function that accepts the piped input.
