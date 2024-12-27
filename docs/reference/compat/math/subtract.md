# subtract

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Subtract two numbers.

If either number is `NaN`, the function returns `NaN`.

## Signature

```typescript
function subtract(value: number, other: number): number;
```

### Parameters

- `value` (`number`): The base number.
- `other` (`number`): The number to subtract from the base number.

### Returns

(`number`): Subtraction of two numbers. If either argument is `NaN`, the function returns `NaN`.

## Examples

```typescript
subtract(6, 4); // Returns 2.
subtract(-6, 4); // Returns -10.
subtract(NaN, 4); // Since value is NaN, it returns NaN.
subtract(6, NaN); // Since other is NaN, it returns NaN.
subtract(NaN, NaN); // Since both arguments are NaN, it returns NaN.
```
