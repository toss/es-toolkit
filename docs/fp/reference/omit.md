# omit (Functional Programming)

Creates a function that removes the given keys from an object. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(obj, omit(keys));
```

::: info

Prefer the original es-toolkit [`omit`](../../reference/object/omit.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`omit` returns a new object with the specified `keys` removed from the input object.

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### Parameters

- `keys` (`readonly K[]`): The keys to exclude from the new object.

#### Returns

(`(obj: T) => Omit<T, K>`): A function that maps an object `T` to a new object without the omitted keys.
