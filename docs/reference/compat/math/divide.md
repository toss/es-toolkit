# divide

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Divide two numbers.

If either of the numbers is `NaN`, the function returns `NaN`.

## Signature

```typescript
function divide(value: number, other: number): number;
```

### Parameters

- `value` (`number`): The first number in a division.
- `other` (`number`): The second number in a division.

### Returns

(`number`): The quotient of value and other.

## Examples

```typescript
divide(6, 3); // => 2
divide(2, NaN); // => NaN
divide(NaN, 3); // => NaN
divide(NaN, NaN); // => NaN
```