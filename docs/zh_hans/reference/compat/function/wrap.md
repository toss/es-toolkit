# wrap

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

Creates a new function that passes the original function `value` as the first argument to the `wrapper`.
This allows you to decorate or extend the behavior of the original function in a flexible way.

## 签名

```typescript
function wrap<T extends (...args: unknown[]) => unknown>(value: T, wrapper: (fn: T, ...args: Parameters<T>) => ReturnType<T>): (...args: Parameters<T>) => ReturnType<T>;
```

### 参数

- `value` (`T`): The original function to wrap.
- `wrapper` (`(value: T, ...args: Parameters<T>) => ReturnType<T>`): A function that receives the original function and its arguments, and returns the result.

### 返回值

(`null`): A new function with the same signature as `value`, but wrapped by `wrapper`.

## 示例

```typescript
const greet = (name: string) => `Hi, ${name}`;
const wrapped = wrap(greet, (fn, name) => `[LOG] ${fn(name)}`);
wrapped('Bob'); // => "[LOG] Hi, Bob"

// Wrapping to modify arguments
const multiply = (a: number, b: number) => a * b;
const doubleFirst = wrap(multiply, (fn, a, b) => fn(a * 2, b));
doubleFirst(3, 4); // => 24
```