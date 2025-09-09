# isElement

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.
When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Checks if `value` is likely a DOM element.

## Signature

```typescript
function isElement(value?: any): boolean;
```

### Parameters

- `value` (`any`): The value to check.

### Returns

(`boolean`): Returns `true` if `value` is a DOM element, else `false`.

## Example

```typescript
console.log(isElement(document.body)); // Output: true
console.log(isElement('<body>')); // Output: false
```
