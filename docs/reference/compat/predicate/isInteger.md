# isInteger

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if `value` is an integer.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.

## Signature

```typescript
function isInteger(value?: unknown): value is number;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): `true` if `value` is integer, otherwise `false`.

## Examples

```typescript
isInteger(3); // Returns: true
isInteger(Infinity); // Returns: false
isInteger('3'); // Returns: false
isInteger([]); // Returns: false
```
