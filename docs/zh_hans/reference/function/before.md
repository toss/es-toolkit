# before

创建一个限制函数调用次数的新函数。

```typescript
const limitedFunc = before(n, func);
```

## 参考

### `before(n, func)`

当您想要限制函数只执行特定次数时,请使用 `before`。函数只会执行到第 `n-1` 次调用,从第 `n` 次开始将不再执行。

```typescript
import { before } from 'es-toolkit/function';

const beforeFn = before(3, () => {
  console.log('执行了');
});

// 打印 '执行了'
beforeFn();

// 打印 '执行了'
beforeFn();

// 不会打印任何内容
beforeFn();

// 不会打印任何内容
beforeFn();
```

这在只需执行一次的任务(如初始化或设置)中特别有用。

```typescript
let initialized = false;

const initialize = before(2, () => {
  console.log('初始化中...');
  initialized = true;
});

// 打印 '初始化中...' 并执行初始化
initialize();

// 已经初始化,不会执行任何操作
initialize();
```

#### 参数

- `n` (`number`): 返回的函数可以调用 `func` 的最大次数。如果 `n` 为 0,则 `func` 不会被调用。如果是正整数,则最多调用 `n-1` 次。
- `func` (`F`): 调用次数将被限制的函数。

#### 返回值

(`(...args: Parameters<F>) => ReturnType<F> | undefined`): 跟踪调用次数并只执行到第 `n-1` 次 `func` 调用的新函数。从第 `n` 次调用开始将返回 `undefined`。

#### 错误

当 `n` 不是整数或为负数时会抛出错误。
