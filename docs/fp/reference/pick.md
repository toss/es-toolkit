# pick

Creates a data-last operator that keeps only the given keys of an object.

```typescript
const result = pipe(obj, pick(keys));
```

## Usage

`pick` returns a new object that contains only the specified `keys` from the input object. Keys that are not present on the input are skipped.

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### Parameters

- `keys` (`readonly K[]`): The keys to copy into the new object.

#### Returns

(`(obj: T) => Pick<T, K>`): A data-last operator that maps an object `T` to a new object with only the picked keys.
