# castArray

Casts value as an array if it's not one.

## Signature

```typescript
function castArray<T>(value?: T | readonly T[]): T[];
```

### Parameters

- `value` (`T | readonly T[]`): The value to be cast to an array.

### Returns

(`T[]`): An array containing the input value if it wasn't an array, or the original array if it was.

## Examples

```typescript
import { castArray } from 'es-toolkit/array';

const arr1 = castArray(1);
// Returns: [1]

const arr2 = castArray([1]);
// Returns: [1]

const arr3 = castArray({ a: 1 });
// Returns: [{'a': 1}]

const arr4 = castArray(null);
// Returns: [null]

const arr5 = castArray(undefined);
// Returns: [undefined]

const arr6 = castArray();
// Returns: []
```
