# rearg

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes `func` with arguments arranged according to the specified `indexes` where the argument value at the first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.

## Signature

```typescript
function rearg<F extends (...args: any[]) => any>(
  func: F,
  ...indexes: Array<number | number[]>
): (...args: any[]) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to rearrange arguments for.
- `indexes` (`Array<number | number[]>`): The arranged argument indexes.

### Returns

(`(...args: any[]) => ReturnType<F>`): Returns the new function.

## Examples

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const rearrangedGreet = rearg(greet, 1, 0);
console.log(rearrangedGreet('World', 'Hello')); // Output: "Hello, World!"
```
