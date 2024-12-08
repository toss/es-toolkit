# isFinite

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Check if the given value is a finite number.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.

## Signature

```typescript
function isFinite(value?: unknown): value is number;
```

### Parameters

- `value`(`unknown`): The value to test if it is a finite number.

### Returns

(`value is number`): True if the value is a finite number, otherwise false.

## Examples

```typescript
const value1 = 100;
const value2 = Infinity;
const value3 = '100';

console.log(isFinite(value1)); // true
console.log(isFinite(value2)); // false
console.log(isFinite(value3)); // false
```
