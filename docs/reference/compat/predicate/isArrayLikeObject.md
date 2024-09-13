# isArrayLikeObject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Check if a value is a non-primitive, array-like object.

An array-like object is an object that is not `null` or `undefined` or a function, and has a `length` property that is a valid length.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `ArrayLike<unknown> & object`.

## Signature

```typescript
function isArrayLikeObject(value: unknown): value is ArrayLike<unknown> & object;
```

### Parameters

- `value` (`unknown`): The value to check if it is a non-primitive, array-like object.

### Returns

(`value is ArrayLike<unknown> & object`): Returns `true` if the value is a non-primitive, array-like object, otherwise `false`.

## Examples

```typescript
import { isArrayLikeObject } from 'es-toolkit/predicate';

console.log(isArrayLikeObject([1, 2, 3])); // true
console.log(isArrayLikeObject({ 0: 'a', length: 1 })); // true
console.log(isArrayLikeObject('abc')); // false
console.log(isArrayLikeObject(() => {})); // false
```
