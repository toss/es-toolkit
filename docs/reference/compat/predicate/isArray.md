# isArray

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if the given value is an array.

This function tests whether the provided value is an array or not.
It returns `true` if the value is an array, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an array.

## Signature

```typescript
function isArray(value?: unknown): value is any[];
```

### Parameters

- `value` (`unknown`): The value to test if it is an array.

### Returns

(`value is any[]`): `true` if the value is an array, `false` otherwise.

## Examples

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
