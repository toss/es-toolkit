# isLength

Checks if a given value is a valid length.

This function tests whether the provided value is of type `number`, is a non-negative integer, and is less than or equal to JavaScript's maximum safe integer (`Number.MAX_SAFE_INTEGER`). It returns `true` if the value is a valid length, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to a valid length (`number`).

## Signature

```typescript
function isLength(value: unknown): value is number;
```

### Parameters

- `value` (`unknown`): The value to check if it is a valid length.

### Returns

(`value is number`): Returns `true` if the value is a valid length, otherwise `false`.

## Examples

```typescript
import { isLength } from 'es-toolkit/predicate';

const value1 = 0;
const value2 = 42;
const value3 = -1;
const value4 = 1.5;
const value5 = Number.MAX_SAFE_INTEGER;
const value6 = Number.MAX_SAFE_INTEGER + 1;

console.log(isLength(value1)); // true
console.log(isLength(value2)); // true
console.log(isLength(value3)); // false
console.log(isLength(value4)); // false
console.log(isLength(value5)); // true
console.log(isLength(value6)); // false
```
