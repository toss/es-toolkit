# zipObject (Functional Programming)

Creates a function that builds an object from keys and values. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, zipObject(values));
```

::: info

Prefer the original es-toolkit [`zipObject`](../../reference/array/zipObject.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`zipObject` uses the piped array as keys and pairs each key with the value at the same index in `values`.

```typescript
import { pipe, zipObject } from 'es-toolkit/fp';

pipe(['a', 'b'] as const, zipObject([1, 2])); // => { a: 1, b: 2 }
```

#### Parameters

- `values` (`readonly V[]`): The values assigned to keys from the piped array by index.

#### Returns

(`(keys: readonly P[]) => Record<P, V>`): A function that maps keys to an object built from `values`.
