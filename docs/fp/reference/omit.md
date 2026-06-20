# omit

Creates a data-last operator that removes the given keys from an object.

```typescript
const result = pipe(obj, omit(keys));
```

## Usage

`omit` returns a new object with the specified `keys` removed from the input object.

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### Parameters

- `keys` (`readonly K[]`): The keys to exclude from the new object.

#### Returns

(`(obj: T) => Omit<T, K>`): A data-last operator that maps an object `T` to a new object without the omitted keys.
