# toInteger

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `value` to an integer.

This function first converts `value` to a finite number. If the result has any decimal places,
they are removed by rounding down to the nearest whole number.

## Signature

```typescript
function toInteger(value?: unknown): number;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`number`): The converted integer.

## Examples

```typescript
toInteger(3.2); // => 3
toInteger(Number.MIN_VALUE); // => 0
toInteger(Infinity); // => 1.7976931348623157e+308
toInteger('3.2'); // => 3
toInteger(Symbol.iterator); // => 0
toInteger(NaN); // => 0
```
