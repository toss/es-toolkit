# takeWhile (Functional Programming)

Creates a function that takes leading values while a predicate passes. Use it with [`pipe`](./pipe.md).

```typescript
const result = pipe(array, takeWhile(predicate));
```

## Usage

`takeWhile` walks the piped array from the beginning and keeps values while `predicate` returns `true`. It is lazy-capable and can stop earlier lazy operations inside [`pipe`](./pipe.md).

```typescript
import { takeWhile, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 1], takeWhile(value => value < 3)); // => [1, 2]
```

#### Parameters

- `predicate` (`(element: T, index: number) => boolean`): The function that decides whether a leading value should be kept.

#### Returns

(`(array: readonly T[]) => T[]`): A function that maps a `readonly T[]` to the leading values that pass.
