# isFunction

Checks if `value` is a function.

This function returns `true` if `value` is a function, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to a function.

## Signature

```typescript
function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
```

### Parameters

- `value` (`unknown`): The value to check if it is a function.

### Returns

(`value is (...args: unknown[]) => unknown`): Returns `true` if the value is a function, otherwise `false`.

## Examples

```typescript
import { isFunction } from 'es-toolkit/predicate';

console.log(isFunction(Array.prototype.slice)); // true
console.log(isFunction(async function () {})); // true
console.log(isFunction(function* () {})); // true
console.log(isFunction(Proxy)); // true
console.log(isFunction(Int8Array)); // true
```
