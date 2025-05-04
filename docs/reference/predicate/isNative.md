# isNative

Checks if `value` is a native function.

A native function is a function that is implemented in the JavaScript engine itself, such as `Array.prototype.map`, `Object.keys`, or `Function.prototype.bind`.

## Interface

```typescript
function isNative(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): Returns `true` if `value` is a native function, else `false`.

## Examples

```typescript
import { isNative } from 'es-toolkit/predicate';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
