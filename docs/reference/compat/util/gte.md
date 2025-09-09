# gte

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if value is greater than or equal to other.

## Signature

```typescript
function gte(value: any, other: any): boolean;
```

### Parameters

- `value` (`any`): The value to compare.
- `other` (`any`): The other value to compare.

### Returns

(`boolean`): Returns `true` if value is greater than or equal to other, else `false`.

## Examples

```typescript
gte(3, 1); // => true
gte(3, 3); // => true
gte(1, 3); // => false
```
