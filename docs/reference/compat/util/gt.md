# gt

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if value is greater than other.

## Signature

```typescript
function gt(value: unknown, other: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to compare.
- `other` (`unknown`): The other value to compare.

### Returns

(`boolean`): Returns `true` if value is greater than other, else `false`.

## Examples

```typescript
gt(3, 1); // true
gt(3, 3); // false
gt(1, 3); // false
```