# isSafeInteger

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if `value` is a safe integer (between -(2^53 – 1) and (2^53 – 1), inclusive).

A safe integer is an integer that can be exactly represented as a double precision number,
and no other integer rounds to it under any IEEE-754 rounding mode.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.

## Signature

```typescript
function isSafeInteger(value?: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check

### Returns

(`boolean`): `true` if `value` is an integer and between the safe values, otherwise `false`

## Examples

```typescript
isInteger(3); // Returns: true
isInteger(Number.MIN_SAFE_INTEGER - 1); // Returns: false
isInteger(1n); // Returns: false
isInteger('1'); // Returns: false
```
