# toNumber

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `value` to a number.

Unlike `Number()`, this function returns `NaN` for symbols.

## Signature

```typescript
function toNumber(value?: unknown): number;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`number`): The converted number.

## Examples

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => Infinity
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => NaN
toNumber(NaN); // => NaN
```
