# isNative

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if `value` is a native function.

A native function is a function that is implemented in the JavaScript engine itself, such as `Array.prototype.map`, `Object.keys`, or `Function.prototype.bind`.

## Signature

```typescript
function isNative(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): Returns `true` if `value` is a native function, else `false`.

## Examples

```typescript
import { isNative } from 'es-toolkit/compat';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
