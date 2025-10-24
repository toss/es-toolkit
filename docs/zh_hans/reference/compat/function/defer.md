# defer (Lodash 兼容性)

::: warning 请使用 `setTimeout`

这个 `defer` 函数是一个简单的包装器，内部调用 `setTimeout(func, 1, ...args)`。

请使用更直接和现代的 `setTimeout`。

:::

将函数的执行延迟到下一个事件循环。

```typescript
const timerId = defer(func, ...args);
```

## 参考

### `defer(func, ...args)`

当您想在当前调用栈结束后执行函数时，请使用 `defer`。您可以将函数执行延迟到下一个事件循环，同时向函数传递额外的参数。

```typescript
import { defer } from 'es-toolkit/compat';

// 延迟控制台输出
defer(console.log, 'deferred message');
// 在当前调用栈结束后输出 'deferred message'

// 延迟执行函数和参数
const greet = (name: string, greeting: string) => {
  console.log(`${greeting}, ${name}!`);
};

defer(greet, 'John', 'Hello');
// 在当前调用栈结束后输出 'Hello, John!'
```

内部使用 `setTimeout(func, 1, ...args)` 在 1 毫秒后执行函数。

```typescript
import { defer } from 'es-toolkit/compat';

// 以下两段代码的工作方式相同
defer(console.log, 'message');
setTimeout(console.log, 1, 'message');
```

#### 参数

- `func` (`(...args: any[]) => any`): 要延迟执行的函数。
- `...args` (`any[]`): 要传递给函数的参数。

#### 返回值

(`number`): 返回从 `setTimeout` 返回的计时器 ID。您可以使用 `clearTimeout` 取消执行。
