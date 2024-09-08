# attempt

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Attempts to execute a function with the provided arguments.
If the function throws an error, it catches the error and returns it.

If the caught error is not an instance of `Error`, it wraps it in a new `Error`.

## Signature

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### Parameters

- `func` (`F`): The function to be executed.
- `args` (`...Parameters<F>`): The arguments to pass to the function.

### Returns

(`ReturnType<F> | Error`): The return value of the function if successful, or an Error if an exception is thrown.

## Examples

```typescript
// Example 1: Successful execution
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // Output: 5

// Example 2: Function throws an error
const errorResult = attempt(() => {
  throw new Error('Something went wrong');
});
console.log(errorResult); // Output: Error: Something went wrong

// Example 3: Non-Error thrown
const nonErrorResult = attempt(() => {
  throw 'This is a string error';
});
console.log(nonErrorResult); // Output: Error: This is a string error
```
