# now

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.

## Signature

```typescript
function now(): number;
```

### Returns

(`number`): The current time in milliseconds.

## Examples

```typescript
const currentTime = now();
console.log(currentTime); // Outputs the current time in milliseconds

const startTime = now();
// Some time-consuming operation
const endTime = now();
console.log(`Operation took ${endTime - startTime} milliseconds`);
```
