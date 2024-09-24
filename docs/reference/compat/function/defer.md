# defer

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Defers invoking the `func` until the current call stack has cleared. Any additional arguments are provided to `func` when it's invoked.

## Signature

```typescript
function defer<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): number;
```

### Parameters

- `func` (`F`): The function to defer.
- `args` (`Parameters<F>`, optional): The arguments to invoke `func` with.

### Returns

(`number`): Returns the timer id.

## Examples

```typescript
import { defer } from 'es-toolkit/compat';

defer(text => {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after the current call stack has cleared.
```
