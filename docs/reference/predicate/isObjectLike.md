# isObjectLike

Check if a value is an object-like array.

It returns `true` if the value is an object-like, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object-like.

## Signature

```typescript
export function isObjectLike<T>(value: T): value is Extract<T, object>;
```

### Parameters

- `value` (`T`): The value to test if it is an object-like.

### Returns

(`value is Extract<T, object>`): Returns `true` if the value is an object-like, `false` otherwise.

## Examples

```typescript
import { isObjectLike } from 'es-toolkit/predicate';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
```
