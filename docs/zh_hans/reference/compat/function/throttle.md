# throttle (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `throttle`

此 `throttle` 函数为了 Lodash 兼容性在内部使用 debounce 函数,使其变得有些复杂。它还具有更复杂的默认值和选项处理。

请改用更快、更现代的 `es-toolkit` 的 [throttle](../../function/throttle.md)。

:::

限制函数调用,使其在指定时间间隔内最多执行一次。

```typescript
const throttledFunc = throttle(func, wait, options);
```

## 参考

### `throttle(func, wait, options)`

当您想限制函数调用在指定时间间隔内最多执行一次时,请使用 `throttle`。它对于限制事件处理程序或 API 调用的频率很有用。

```typescript
import { throttle } from 'es-toolkit/compat';

// 基本用法 - 每秒最多执行一次
const throttledLog = throttle(() => {
  console.log('事件发生!');
}, 1000);

// 使用选项的示例
const throttledScroll = throttle(handleScroll, 100, {
  leading: true, // 首次调用时立即执行
  trailing: false, // 最后一次调用后不执行
});

window.addEventListener('scroll', throttledScroll);
```

在处理快速发生的事件(如滚动或调整大小事件)时,这对于性能至关重要。

#### 参数

- `func` (`Function`): 要节流的函数。
- `wait` (`number`, 可选): 等待时间(毫秒)。默认值为 `0`。
- `options` (`ThrottleSettings`, 可选): 节流选项。
  - `leading` (`boolean`): 是否在首次调用时执行。默认值为 `true`。
  - `trailing` (`boolean`): 是否在最后一次调用后执行。默认值为 `true`。

#### 返回值

(`DebouncedFunc`): 返回节流函数。您可以使用 `cancel()` 方法取消待处理的执行。
