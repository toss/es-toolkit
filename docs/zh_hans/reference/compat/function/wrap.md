# wrap

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个新函数，用于包装给定的函数 `func`。
在这个过程中，你可以在原始函数执行前后应用 `wrapper` 函数中定义的额外逻辑。

如果提供的是值 `value` 而不是函数，这个值将作为第一个参数传递给 `wrapper` 函数。

## 签名

```typescript
function wrap<F extends (...args: unknown[]) => unknown>(
  func: F,
  wrapper: (value: F, ...args: Parameters<F>) => ReturnType<F>
): F;
function wrap<T, A extends unknown[], R>(value: T, wrapper: (value: T, ...args: A) => R): (...args: A) => R;
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
