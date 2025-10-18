# compact

Returns a new array with falsy values removed.

```typescript
const compacted = compact(arr);
```

## Reference

### `compact(arr)`

Use `compact` when you want to remove falsy values (`false`, `null`, `0`, `-0`, `0n`, `''`, `undefined`, `NaN`) from an array. A new array containing only truthy values is returned.

```typescript
import { compact } from 'es-toolkit/array';

// Remove various falsy values.
compact([0, -0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// Returns: [1, 2, 3, 4, 5]

// Remove empty strings from a string array.
compact(['hello', '', 'world', '', '!']);
// Returns: ['hello', 'world', '!']
```

The type system automatically excludes falsy types.

```typescript
import { compact } from 'es-toolkit/array';

const mixed: (string | number | false | null)[] = ['text', 0, false, null, 5];
const result = compact(mixed);
// result's type is (string | number)[]
```

#### Parameters

- `arr` (`T[]`): The array to remove falsy values from.

#### Returns

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`): A new array with falsy values removed.
