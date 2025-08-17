# uniqueId

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Generates a unique identifier, optionally prefixed with a given string.

## Signature

```typescript
function uniqueId(prefix?: string): string;
```

### Parameters

- `prefix` (`string`, optional): The value to prefix the ID with.

### Returns

(`string`): Returns the unique ID.

## Examples

```typescript
uniqueId('contact_'); // => 'contact_104'
uniqueId(); // => '105'
```
