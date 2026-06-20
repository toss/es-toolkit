# map

Creates a data-last operator that transforms every element of an array, equivalent to `Array.prototype.map`.

```typescript
const result = pipe(array, map(callbackfn));
```

## Usage

`map` builds a new array by calling `callbackfn` on each element. It is **lazy-capable**: inside a [`pipe`](/fp/reference/pipe) it is fused with adjacent lazy operators, so a trailing `take` can stop the work early.

```typescript
import { map, pipe } from 'es-toolkit/fp';

// Transform each element.
pipe(
  [1, 2, 3],
  map(x => x * 2)
); // => [2, 4, 6]

// The index is available as the second argument.
pipe(
  [10, 20, 30],
  map((value, index) => value + index)
); // => [10, 21, 32]

// The element type can change.
pipe(
  [1, 2, 3],
  map(x => `#${x}`)
); // => ['#1', '#2', '#3']
```

#### Parameters

- `callbackfn` (`(value: T, index: number, array: readonly T[]) => U`): A function called for each element; its return value becomes the corresponding element of the output array. During lazy evaluation, `array` holds only the elements seen so far.

#### Returns

(`(array: readonly T[]) => U[]`): A data-last operator that maps a `readonly T[]` to a new `U[]`.
