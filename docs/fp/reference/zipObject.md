# zipObject

Creates a data-last zipObject operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, zipObject([1, 2]));
```

## Usage

`zipObject` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

const result = pipe(['a', 'b'], zipObject([1, 2]));
// { a: 1, b: 2 }
```

## API

### `zipObject(...)`

Returns: A function that accepts the piped input.
