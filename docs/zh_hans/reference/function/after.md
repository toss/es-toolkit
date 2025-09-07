# after

创建一个从第`n`次调用开始执行，之前的调用将被忽略的新函数。

```typescript
const newFunc = after(n, func);
```

## 参考

### `after(n, func)`

当您想要忽略前几次调用，从第`n`次开始调用函数时，请使用`after`函数。

```typescript
import { after } from 'es-toolkit';

const mockFn = () => {
  console.log('执行了');
};
const afterFn = after(3, mockFn);

// 不会输出任何内容。
afterFn();
// 不会输出任何内容。
afterFn();
// 输出'执行了'。
afterFn();
```

### 参数

- `n` (`number`): 执行`func`所需的调用次数。
- `func` (`F`): 要执行的函数。

### 返回值

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 返回一个新函数。该函数具有以下功能：

- 跟踪调用次数。
- 从第`n`次调用开始调用`func`。
- 在调用达到`n`次之前返回`undefined`。

### 错误

如果`n`为负数，则会抛出错误。
