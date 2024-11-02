# after

创建一个仅在第 `n` 次调用后执行的函数。
提供的函数将从第 `n` 次调用开始被调用。

这对于涉及事件或异步操作的场景特别有用，其中某个操作应仅在一定数量的调用之后发生。

## 签名

```typescript
function after<F extends (...args: any[]) => any>(
  n: number,
  func: F
): (...args: Parameters<F>) => ReturnType<F> | undefined;
```

### 参数

- `n` (`number`): 要求 `func` 执行的调用次数。
- `func` (`F`): 要调用的函数。

### 返回值

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 一个新函数，它：

- 跟踪调用次数。
- 从第 `n` 次调用开始调用 `func`。
- 如果调用次数少于 `n` 次，则返回 `undefined`。

### 抛出

如果 `n` 为负数，则抛出错误。

## 示例

```typescript
import { after } from 'es-toolkit/function';

const mockFn = () => {
  console.log('called');
};
const afterFn = after(3, mockFn);

// 不会输出任何内容。
afterFn();
// 不会输出任何内容。
afterFn();
// 将输出 'called'。
afterFn();
```
