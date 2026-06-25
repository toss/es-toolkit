# minBy

Creates a data-last minBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  minBy(item => item.score)
);
```

## Usage

`minBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { minBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ score: 1 }, { score: 3 }, { score: 2 }],
  minBy(item => item.score)
);
// { score: 1 }
```

## API

### `minBy(...)`

Returns: A function that accepts the piped input.
