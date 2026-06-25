# zip

Creates a data-last zip operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, zip(['a', 'b']));
```

## Usage

`zip` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, zip } from 'es-toolkit/fp';

const result = pipe([1, 2], zip(['a', 'b']));
// [[1, 'a'], [2, 'b']]
```

## API

### `zip(...)`

Returns: A function that accepts the piped input.
