# flip

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that invokes `func` with arguments reversed.

## Signature

```typescript
type ReverseParameters<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseParameters<Rest>, First]
  : [];

function flip<F extends (...args: any[]) => any>(func: F): (...args: ReverseParameters<Parameters<F>>) => ReturnType<F>;
```

### Parameters

- `func` (`F`): The function to flip arguments for.

### Returns

(`(...args: ReverseParameters<Parameters<F>>) => ReturnType<F>`): The new flipped function.

## Example

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: any, b: any, c: any, d: any) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped(1, 2, 3, 4); // => [4, 3, 2, 1]
```
