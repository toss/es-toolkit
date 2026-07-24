# NonEmptyArray

An array type guaranteed to have at least one element. The first element resolves to `T` instead of `T | undefined`.

```typescript
type Arr = NonEmptyArray<T>;
```

## Usage

### `NonEmptyArray<T>`

Use it when you want to express an array that can't be empty at the type level. An empty array isn't assignable, and accessing the first element always resolves to `T`, so you can use it without an `undefined` check.

```typescript
import type { NonEmptyArray } from 'es-toolkit/types';

const a: NonEmptyArray<number> = [1, 2, 3]; // ok
const b: NonEmptyArray<number> = [1]; // ok
const c: NonEmptyArray<number> = []; // error: an empty array is not allowed.

function first<T>(arr: NonEmptyArray<T>): T {
  // The first element resolves to T, so no undefined check is needed.
  return arr[0];
}
```

#### Type Parameters

- `T`: The type of the elements.
