# isObject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Check if a value is is [the language type](https://262.ecma-international.org/7.0/#sec-ecmascript-language-types) of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String('')).

A value is an object if its type is object, function and it is not null.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an object value.

## Signature

```typescript
function isObject(value: unknown): value is object | Function;
```

### Parameters

- `value` (`unknown`): The value to check if it is an object.

### Returns

(`value is object | Function`): Returns `true` if the value is an object, `false` otherwise.

## Examples

```typescript
import { isObject } from 'es-toolkit/predicate';

const value1 = {};
const value2 = [1, 2, 3];
const value3 = () => {};
const value4 = null;

console.log(isArray(value1)); // true
console.log(isArray(value2)); // true
console.log(isArray(value3)); // true
console.log(isArray(value4)); // false
```
