# toSafeInteger

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `value` to a safe integer. 

A safe integer is an integer that can be exactly represented as a double precision number, and no other integer rounds to it under any IEEE-754 rounding mode. 

If the value is infinite, it is converted to the maximum or minimum safe integer. Any decimal points are removed by truncating the value.

## Signature

```typescript
function toSafeInteger(value?: unknown): number;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`number`): The converted safe integer.

## Examples

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
toSafeInteger(NaN); // => 0
toSafeInteger(null); // => 0
toSafeInteger(-Infinity); // => -9007199254740991
```
