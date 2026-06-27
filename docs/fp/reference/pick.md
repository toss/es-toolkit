# pick (Functional Programming)

Creates a function that keeps only the given keys of an object. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(obj, pick(keys));
```

::: info

Prefer the original es-toolkit [`pick`](../../reference/object/pick.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`pick` returns a new object that contains only the specified `keys` from the input object. Keys that are not present on the input are skipped.

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### Parameters

- `keys` (`readonly K[]`): The keys to copy into the new object.

#### Returns

(`(obj: T) => Pick<T, K>`): A function that maps an object `T` to a new object with only the picked keys.
