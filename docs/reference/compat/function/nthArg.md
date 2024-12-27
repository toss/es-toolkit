# nthArg

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a function that retrieves the argument at the specified index `n`.

If `n` is negative, the nth argument from the end is returned.

## Signature

```typescript
function nthArg(n: number): (...args: any[]) => unknown;
```

### Parameters

- `n` (`number`): The index of the argument to retrieve.
  If negative, counts from the end of the arguments list.

### Returns

(`(args: any[]) => unknown`): A new function that returns the argument at the specified index.

## Examples

```typescript
const getSecondArg = nthArg(1);
const result = getSecondArg('a', 'b', 'c');
console.log(result); // => 'b'

const getLastArg = nthArg(-1);
const result = getLastArg('a', 'b', 'c');
console.log(result); // => 'c'
```
