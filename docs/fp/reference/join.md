# join (Functional Programming)

Creates a function that joins array values into a string. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, join(separator));
```

::: info

This helper is specific to `es-toolkit/fp`. Use it when you want this operation as part of a [`pipe`](./pipe.md) pipeline.

:::

## Usage

`join` converts the piped array to a string by joining its values with `separator`. When `separator` is omitted, it uses a comma.

```typescript
import { join, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], join('-')); // => 'a-b-c'

pipe(['a', 'b', 'c'], join()); // => 'a,b,c'
```

#### Parameters

- `separator` (`string, optional`): The string inserted between values. Defaults to `,`.

#### Returns

(`(array: readonly T[]) => string`): A function that maps a `readonly T[]` to a joined string.
