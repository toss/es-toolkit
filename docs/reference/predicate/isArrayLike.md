# isArrayLike

Check if a value is an array-like object.

An array-like object is an object that is not `null` or `undefined` or a function, and has a `length` property that is a valid length.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an array-like object.

## Signature

```typescript
function isArrayLike(value: unknown): value is ArrayLike<unknown>;
```

### Parameters

- `value` (`unknown`): The value to check if it is an array-like object.

### Returns

(`value is ArrayLike<unknown>`): Returns `true` if the value is an array-like object, otherwise `false`.

## Examples

```typescript
import { isArrayLike } from 'es-toolkit/predicate';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike({ 0: 'a', length: 1 })); // true
console.log(isArrayLike({})); // false
console.log(isArrayLike(null)); // false
console.log(isArrayLike(undefined)); // false
```
