# attempt

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

尝试使用提供的参数执行一个函数。
如果函数抛出错误，它会捕捉错误并返回错误。
如果捕获的错误不是Error实例，它会将其包装在一个新的Error中。

## 签名

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### 参数

- `func` (`F`): 要执行的函数。
- `args` (`...Parameters<F>`): 传递给函数的参数。

### 返回值

(`ReturnType<F> | Error`): 如果成功，返回函数的返回值；如果抛出异常，返回一个Error。

## 示例

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
