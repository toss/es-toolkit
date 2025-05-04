# wrap

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new function that wraps the given function `func`.
In this process, you can apply additional logic defined in the `wrapper` function before and after the execution of the original function.

If a `value` is provided instead of a function, this value is passed as the first argument to the `wrapper` function.


## Signature

```typescript
function wrap<F extends (...args: unknown[]) => unknown>(
  func: F,
  wrapper: (value: F, ...args: Parameters<F>) => ReturnType<F>
): F;
function wrap<T, A extends unknown[], R>(
  value: T,
  wrapper: (value: T, ...args: A) => R
): (...args: A) => R;
```

## Examples

```typescript
// Wrap a function
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrap a primitive value
const wrapped = wrap('value', v => `<p>${v}</p>`);
wrapped(); // => "<p>value</p>"
```
