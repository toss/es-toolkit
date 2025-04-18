# wrap

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

Creates a new function that passes the original function or value `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original value in a flexible way.

## 签名

```typescript
function wrap<T extends (...args: unknown[]) => unknown>(
  value: T,
  wrapper: (value: T, ...args: Parameters<T>) => ReturnType<T>
): (...args: Parameters<T>) => ReturnType<T>;
function wrap<T, TArgs extends unknown[], TResult>(
  value: T,
  wrapper: (value: T, ...args: TArgs) => TResult
): (...args: TArgs) => TResult;
```

## 示例

```typescript
// Wrap a function
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (value, name) => `[LOG] ${value(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrap a primitive value
const wrapped = wrap('value', v => `<p>${v}</p>`);
wrapped(); // => "<p>value</p>"
```
