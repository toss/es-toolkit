# intersectionWith

Creates a data-last intersectionWith operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  intersectionWith([2], (item, id) => item.id === id)
);
```

## Usage

`intersectionWith` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { intersectionWith, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ id: 1 }, { id: 2 }],
  intersectionWith([2], (item, id) => item.id === id)
);
// [{ id: 2 }]
```

## API

### `intersectionWith(...)`

Returns: A function that accepts the piped input.
