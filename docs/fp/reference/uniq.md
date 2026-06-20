# uniq

Creates a data-last operator that removes duplicate values from an array.

```typescript
const result = pipe(array, uniq());
```

## Usage

`uniq` returns a new array containing only unique values, preserving the order of first occurrence. Equality follows `SameValueZero` (the semantics of `Set`).

```typescript
import { pipe, uniq } from 'es-toolkit/fp';

pipe([1, 2, 2, 3, 3, 3], uniq()); // => [1, 2, 3]

// Order of first occurrence is preserved.
pipe([3, 1, 2, 1, 3], uniq()); // => [3, 1, 2]
```

#### Parameters

This operator takes no arguments; call it as `uniq()`.

#### Returns

(`(array: readonly T[]) => T[]`): A data-last operator that maps a `readonly T[]` to a new, duplicate-free `T[]`.
