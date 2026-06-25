# intersectionBy

Creates a data-last intersectionBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  intersectionBy([2], value => (typeof value === 'number' ? value : value.id))
);
```

## Usage

`intersectionBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { intersectionBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionBy([2], value => (typeof value === 'number' ? value : value.id))
);
// [{ id: 2 }]
```

## API

### `intersectionBy(...)`

Returns: A function that accepts the piped input.
