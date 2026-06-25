# sampleSize

Creates a data-last sampleSize operator for functional pipelines. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, sampleSize(2));
```

## Usage

`sampleSize` returns a function that receives the value flowing through `pipe`. This keeps the data as the first argument of `pipe` and puts the operator configuration next to the transformation step.

```typescript
import { pipe, sampleSize } from 'es-toolkit/fp';

const result = pipe([1, 2, 3, 4], sampleSize(2));
// two elements from the array
```

## API

### `sampleSize(...)`

Returns: A function that accepts the piped input.
