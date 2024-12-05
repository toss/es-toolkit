# stubObject

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns an empty object.

## Signature

```typescript
function stubObject(): Record<PropertyKey, never>;
```

### Returns

(`Record<PropertyKey, never>`): An empty object.

## Examples

```typescript
stubObject(); // Returns {}
```
