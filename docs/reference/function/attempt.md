# attempt

Attempts to invoke `func`, returning either the result or the caught error object. Any additional arguments are provided to `func` when it's invoked.

## Signature

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### Parameters

- `func` (`F`): The function to attempt.
- `args` (`Parameters<F>`): The arguments to provide to `func`.

### Returns

(`ReturnType<F>` | `Error`): The result of `func` or the caught error object.

## Examples

```typescript
import { attempt } from 'es-toolkit/function';

// Avoid throwing errors for invalid selectors.
let elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (elements instanceof Error) {
  elements = [];
}
```
