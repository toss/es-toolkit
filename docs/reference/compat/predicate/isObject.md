# isObject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if the given value is an object. An object is a value that is not a primitive type (string, number, boolean, symbol, null, or undefined).

This function tests whether the provided value is an object or not.
It returns `true` if the value is an object, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object value.

## Signature

```typescript
function isObject(value: unknown): value is object;
```

### Parameters

- `value` (`unknown`): The value to check if it is an object.

### Returns

(`value is object`): Returns `true` if the value is an object, `false` otherwise.

## Examples

```typescript
import { isObject } from 'es-toolkit/predicate';

const value1 = {};
const value2 = [1, 2, 3];
const value3 = () => {};
const value4 = null;

console.log(isObject(value1)); // true
console.log(isObject(value2)); // true
console.log(isObject(value3)); // true
console.log(isObject(value4)); // false
```
