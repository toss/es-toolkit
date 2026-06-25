# maxBy

Creates a data-last maxBy operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  maxBy(item => item.score)
);
```

## Usage

`maxBy` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ score: 1 }, { score: 3 }, { score: 2 }],
  maxBy(item => item.score)
);
// { score: 3 }
```

## API

### `maxBy(...)`

Returns: A function that accepts the piped input.
