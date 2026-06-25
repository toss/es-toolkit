# toFilled

Creates a data-last toFilled operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, toFilled(0, 1, 3));
```

## Usage

`toFilled` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, toFilled } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], toFilled(0, 1, 3));
// [1, 0, 0]
```

## API

### `toFilled(...)`

Returns: A function that accepts the piped input.
