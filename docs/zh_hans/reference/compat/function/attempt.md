# attempt (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [`attempt`](../../util/attempt.md) 函数或 try-catch 块

此 `attempt` 函数可能会让人困惑，因为它不区分地返回错误和返回值。

请改用更直接和清晰的 [`attempt`](../../util/attempt.md) 函数或 try-catch 块。

:::

执行函数并在发生错误时返回错误对象的函数。

```typescript
const result = attempt(func, ...args);
```

## 参考

### `attempt(func, ...args)`

当您想安全地执行函数时使用 `attempt`。在执行可能抛出错误的函数时，它很有用，可以防止程序崩溃并将错误作为返回值处理。

```typescript
import { attempt } from 'es-toolkit/compat';

// 基本用法 - 成功的情况
const result = attempt((x, y) => x + y, 2, 3);
console.log(result); // 5

// 错误情况
const errorResult = attempt(() => {
  throw new Error('出错了');
});
console.log(errorResult); // Error: 出错了
```

以下是与使用 try-catch 块的区别。

```typescript
// 使用 attempt
import { attempt } from 'es-toolkit/compat';

const result = attempt(riskyFunction, arg1, arg2);
if (result instanceof Error) {
  console.log('发生错误:', result.message);
} else {
  console.log('结果:', result);
}

// 使用 try-catch (更直接)
try {
  const result = riskyFunction(arg1, arg2);
  console.log('结果:', result);
} catch (error) {
  console.log('发生错误:', error.message);
}
```

#### 参数

- `func` (`Function`): 要执行的函数。
- `args` (`...any[]`): 要传递给函数的参数。

#### 返回值

(`ReturnType<F> | Error`): 如果函数成功则返回返回值，如果发生错误则返回 Error 对象。
