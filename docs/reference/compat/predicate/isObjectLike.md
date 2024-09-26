# isObjectLike

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Check if a value is an object-like.

A value is object-like if its type is object and it is not null.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object-like value.

## Signature

```typescript
function isObjectLike(value: unknown): value is object;
```

### Parameters

- `value` (`unknown`): The value to test if it is an object-like.

### Returns

(`value is object`): Returns `true` if the value is an object-like, `false` otherwise.

## Examples

```typescript
import { isObjectLike } from 'es-toolkit/compat';

const value1 = { a: 1 };
const value2 = [1, 2, 3];
const value3 = 'abc';
const value4 = () => {};
const value5 = null;

console.log(isObjectLike(value1)); // true
console.log(isObjectLike(value2)); // true
console.log(isObjectLike(value3)); // false
console.log(isObjectLike(value4)); // false
console.log(isObjectLike(value5)); // false
```
