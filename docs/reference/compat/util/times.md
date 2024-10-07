# times

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Invokes the iteratee n times, returning an array of the results of each invocation.

The iteratee is invoked with one argument; (index).

## Signature

```typescript
function times<F extends (n: number) => any>(n?: number, iteratee?: F): Array<ReturnType<F>>;
```

### Parameters

- `n` (`number`): The number of times to invoke iteratee.
- `iteratee` (`F extends (n: number) => any`): The function invoked per iteration. Default is identity.

### Returns

(`Array<ReturnType<F>>`): Returns the array of results.

## Examples

```typescript
times(3, doubled); // => [0, 2, 4]
times(4); // => [0, 1, 2, 3]
times(2, () => 'es-toolkit') // => ['es-toolkit', 'es-toolkit']
```