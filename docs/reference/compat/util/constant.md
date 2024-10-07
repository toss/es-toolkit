# constant

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new function that always returns `value`.

## Signature

```typescript
function constant(): () => undefined;
function constant<T>(value: T): () => T;
```

### Parameters

- `value` (`T`): The value to return from the new function.

### Returns

(`() => T | undefined`): The new constant function.

## Examples

```typescript
const object = { a: 1 };
const returnsObject = constant(object);

returnsObject(); // => { a: 1 }
returnsObject() === object; // => true
```
