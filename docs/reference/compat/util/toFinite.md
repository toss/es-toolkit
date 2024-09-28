# toFinite

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `value` to a finite number.

## Signature

```typescript
function toFinite(value?: unknown): number;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`number`): The finite number.

## Examples

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => 1.7976931348623157e+308
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => 0
toNumber(NaN); // => 0
```