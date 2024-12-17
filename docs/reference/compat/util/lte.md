# lte

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if value is less than or equal to other.

## Signature

```typescript
function lte(value: unknown, other: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to compare.
- `other` (`unknown`): The other value to compare.

### Returns

(`boolean`): Returns `true` if value is less than or equal to other, else `false`.

## Examples

```typescript
lte(1, 3); // => true
lte(3, 3); // => true
lte(3, 1); // => false
```
