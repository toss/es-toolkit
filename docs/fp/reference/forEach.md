# forEach

Creates a data-last forEach operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(
  array,
  forEach(value => console.log(value))
);
```

## Usage

`forEach` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { forEach, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 2, 3],
  forEach(value => console.log(value))
);
// [1, 2, 3]
```

## API

### `forEach(...)`

Returns: A function that accepts the piped input.
