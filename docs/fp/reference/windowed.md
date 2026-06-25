# windowed

Creates a data-last windowed operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, windowed(2));
```

## Usage

`windowed` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, windowed } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], windowed(2));
// [[1, 2], [2, 3], [3, 4]]
```

## API

### `windowed(...)`

Returns: A function that accepts the piped input.
