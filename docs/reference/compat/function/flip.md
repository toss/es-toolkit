# flip

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Reverses the order of arguments for a given function.

## Signature

```typescript
function flip<F extends (...args: any[]) => any>(func: F): (...args: Reversed<Parameters<F>>) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function whose arguments will be reversed.

### Returns

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): A new function that takes the reversed arguments and returns the result of calling `func`.

## Example

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped(1, 2, 3, 4); // => [4, 3, 2, 1]
```
