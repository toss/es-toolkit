# isNumber

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if a given value is a number.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.

## Signature

```typescript
function isNumber(value?: unknown): value is number;
```

### Parameters

- `value` (`unknown`): The value to check if it is a number.

### Returns

(`value is number`): Returns `true` if `value` is a number, else `false`.

## Examples

```typescript
const value1 = 123;
const value2 = 'abc';
const value3 = true;

console.log(isNumber(value1)); // true
console.log(isNumber(value2)); // false
console.log(isNumber(value3)); // false
```
