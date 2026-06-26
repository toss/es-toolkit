# toFilled (Functional Programming)

Creates a function that returns a filled copy of an array. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, toFilled(value, start, end));
```

::: info

Prefer the original es-toolkit [`toFilled`](../../reference/array/toFilled.md) in ordinary code. Use this `fp` variant when composing transformations with [`pipe`](./pipe.md).

:::

## Usage

`toFilled` fills a copy of the piped array with `value` from `start` up to, but not including, `end`. It follows `Array.prototype.fill` index semantics and does not mutate the input array.

```typescript
import { pipe, toFilled } from 'es-toolkit/fp';

const array = [1, 2, 3, 4];

pipe(array, toFilled(0, 1, 3)); // => [1, 0, 0, 4]
array; // => [1, 2, 3, 4]
```

#### Parameters

- `value` (`U`): The value to write into the returned array.
- `start` (`number, optional`): The start index. Defaults to `0`.
- `end` (`number, optional`): The end index. Defaults to the array length.

#### Returns

(`(array: readonly T[]) => Array<T | U>`): A function that maps a `readonly T[]` to a filled copy.
