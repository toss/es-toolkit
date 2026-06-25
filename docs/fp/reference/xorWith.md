# xorWith

Creates a data-last xorWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
);
```

## Usage

`xorWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, xorWith } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  xorWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
);
// [{ id: 1 }, { id: 3 }]
```

## API

### `xorWith(...)`

Returns: A function that accepts the piped input.
