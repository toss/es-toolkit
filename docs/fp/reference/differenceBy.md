# differenceBy

Creates a data-last differenceBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  differenceBy([2], value => (typeof value === 'number' ? value : value.id))
);
```

## Usage

`differenceBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { differenceBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  differenceBy([2], value => (typeof value === 'number' ? value : value.id))
);
// [{ id: 1 }]
```

## API

### `differenceBy(...)`

Returns: A function that accepts the piped input.
