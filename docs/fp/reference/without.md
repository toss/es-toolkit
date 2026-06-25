# without

Creates a data-last without operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, without(2));
```

## Usage

`without` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, without } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 2], without(2));
// [1, 3]
```

## API

### `without(...)`

Returns: A function that accepts the piped input.
