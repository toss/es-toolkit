# after

创建一个新函数,从第 `n` 次调用开始执行原始函数。

```typescript
const afterFunc = after(n, func);
```

## 用法

### `after(n, func)`

当您想忽略前几次调用并从第 `n` 次调用开始执行函数时,请使用 `after`。这在事件或异步操作中需要在特定次数后才执行操作时非常有用。

```typescript
import { after } from 'es-toolkit/function';

const afterFn = after(3, () => {
  console.log('executed');
});

// 不记录任何内容
afterFn();
// 不记录任何内容
afterFn();
// 记录 'executed'
afterFn();
// 记录 'executed'
afterFn();
```

#### 参数

- `n` (`number`): 执行 `func` 所需的调用次数。
- `func` (`F`): 要执行的函数。

#### 返回值

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 一个新函数,跟踪调用次数并从第 `n` 次调用开始执行 `func`。在第 `n` 次调用之前返回 `undefined`。

#### 错误

当 `n` 不是整数或为负数时抛出错误。
