# wrap

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new function that passes the original function `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original function in a flexible way.

## Signature

```typescript
function wrap<T extends (...args: unknown[]) => unknown>(value: T, wrapper: (fn: T, ...args: Parameters<T>) => ReturnType<T>): (...args: Parameters<T>) => ReturnType<T>;
```

### Parameters

- `value` (`T`): The original function to wrap.
- `wrapper` (`(value: T, ...args: Parameters<T>) => ReturnType<T>`): A function that receives the original function and its arguments, and returns the result.

### Returns

(`null`): A new function with the same signature as `value`, but wrapped by `wrapper`.

## Examples

```typescript
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (fn, name) => `[LOG] ${fn(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrapping to modify arguments
const multiply = (a: number, b: number) => a * b;
const doubleFirst = wrap(multiply, (fn, a, b) => fn(a * 2, b));
doubleFirst(3, 4); // => 24
```