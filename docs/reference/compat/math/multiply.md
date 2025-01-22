# multiply

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Multiply two numbers.

If either value is `NaN`, it returns `NaN`.

## Signature

```typescript
function multiply(value: number, other: number): number;
```

### Parameters

- `value` (`number`): The first number in a multiplication.
- `other` (`number`): The second number in a multiplication.

### Returns

(`number`): Returns the product of `value` and `other`. If either parameter is `NaN`, it returns `NaN`.

## Examples

```typescript
multiply(2, 3); // Returns 6.
multiply(2, -3); // Returns -6.
multiply(NaN, 3); // Returns NaN because value is NaN.
multiply(2, NaN); // Returns NaN because other is NaN.
multiply(NaN, NaN); // Returns NaN because both arguments are NaN.
```
