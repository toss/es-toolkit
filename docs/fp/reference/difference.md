# difference

Creates a data-last difference operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, difference([2, 4]));
```

## Usage

`difference` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { difference, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], difference([2, 4]));
// [1, 3]
```

## API

### `difference(...)`

Returns: A function that accepts the piped input.
