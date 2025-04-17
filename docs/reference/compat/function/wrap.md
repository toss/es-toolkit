# wrap

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Creates a new function that passes the original function or value `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original value in a flexible way.

## Signature

```typescript
function wrap<T extends (...args: any[]) => any>(
  value: T,
  wrapper: (value: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T>;
function wrap<T, TArgs extends unknown[], TResult>(
  value: T,
  wrapper: (value: T, ...args: TArgs) => TResult
): (...args: TArgs) => TResult;
function wrap(value: unknown, wrapper: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown;
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
