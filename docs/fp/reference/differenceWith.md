# differenceWith

Creates a data-last differenceWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  differenceWith([2], (item, id) => item.id === id)
);
```

## Usage

`differenceWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { differenceWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  differenceWith([2], (item, id) => item.id === id)
);
// [{ id: 1 }]
```

## API

### `differenceWith(...)`

Returns: A function that accepts the piped input.
