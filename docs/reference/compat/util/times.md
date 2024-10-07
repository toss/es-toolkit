# times

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Invokes the `getValue` function `n` times, returning an array of the results.

## Signature

```typescript
function times<R = number>(n?: number, getValue?: (index: number) => R): R[];
```

### Parameters

- `n` (`number`): The number of times to call the function.
- `getValue` (`(index: number) => R`): The function called for each iteration.
  - If not provided, an array from `0` to `n-1`.

### Returns

(`R[]`): Returns the array of results.

## Examples

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit'); // => ['es-toolkit', 'es-toolkit']
```
