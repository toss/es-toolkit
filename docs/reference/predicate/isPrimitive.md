# isPrimitive

Checks whether a value is a JavaScript primitive.

JavaScript primitives include null, undefined, strings, numbers, booleans, symbols, and bigints.

## Signature

```typescript
function isPrimitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint;
```

### Parameters

- `x` (`unknown`): The value to check.

### Returns

(`x is null | undefined | string | number | boolean | symbol | bigint`): True if the value is a primitive, otherwise false.

## Examples

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive('123'); // true
isPrimitive(false); // true
isPrimitive(true); // true
isPrimitive(Symbol('a')); // true
isPrimitive(123n); // true
isPrimitive({}); // false
isPrimitive(new Date()); // false
isPrimitive(new Map()); // false
isPrimitive(new Set()); // false
isPrimitive([1, 2, 3]); // false
```
