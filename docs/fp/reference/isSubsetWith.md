# isSubsetWith

Creates a data-last isSubsetWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
);
```

## Usage

`isSubsetWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { isSubsetWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }],
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
);
// true
```

## API

### `isSubsetWith(...)`

Returns: A function that accepts the piped input.
