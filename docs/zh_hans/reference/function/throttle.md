# throttle

限制函数在指定时间内最多执行一次。

```typescript
const throttledFunc = throttle(func, throttleMs, options);
```

## 参考

### `throttle(func, throttleMs, options?)`

当您想要限制函数调用的时间间隔时,请使用 `throttle`。这在处理频繁发生的事件(如滚动、调整大小、鼠标移动)时优化性能很有用。

与 `debounce` 不同,throttle 保证函数在指定时间内至少执行一次。

```typescript
import { throttle } from 'es-toolkit/function';

// 基本用法 (每秒最多执行一次)
const throttledLog = throttle(() => {
  console.log('函数执行了!');
}, 1000);

// 第一次调用: 立即执行
throttledLog(); // 输出 '函数执行了!'

// 1 秒内的额外调用: 被忽略
throttledLog();
throttledLog();

// 1 秒后最后一次调用作为 trailing 执行

// 优化滚动事件
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100); // 每 100ms 最多一次

window.addEventListener('scroll', handleScroll);

// 优化 API 调用
const searchThrottled = throttle(async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`);
  console.log('搜索结果:', await results.json());
}, 300);

// 即使每次输入都调用,也只每 300ms 执行一次实际搜索
searchThrottled('hello');
searchThrottled('hello w');
searchThrottled('hello world');
```

可以调整 leading 和 trailing 选项。

```typescript
import { throttle } from 'es-toolkit/function';

// 只启用 leading (只在开始时执行)
const leadingOnly = throttle(() => console.log('Leading only'), 1000, { edges: ['leading'] });

// 只启用 trailing (只在结束时执行)
const trailingOnly = throttle(() => console.log('Trailing only'), 1000, { edges: ['trailing'] });

leadingOnly(); // 立即执行
leadingOnly(); // 被忽略
leadingOnly(); // 被忽略

trailingOnly(); // 不会立即执行
trailingOnly(); // 被忽略
trailingOnly(); // 1 秒后执行
```

也可以手动控制。

```typescript
import { throttle } from 'es-toolkit/function';

const throttledFunc = throttle(() => console.log('执行了'), 1000);

throttledFunc(); // 立即执行
throttledFunc(); // 等待中

// 立即处理等待中的执行
throttledFunc.flush();

// 取消等待中的执行
throttledFunc.cancel();
```

#### 参数

- `func` (`F`): 要限制执行的函数。
- `throttleMs` (`number`): 限制执行的时间间隔(毫秒)。
- `options` (`ThrottleOptions`, 可选): 额外选项。
  - `signal` (`AbortSignal`, 可选): 可以取消函数执行的信号。
  - `edges` (`Array<'leading' | 'trailing'>`, 可选): 决定函数执行时机。默认值为 `['leading', 'trailing']`。

#### 返回值

(`ThrottledFunction<F>`): 返回执行被限制的新函数。包含 `cancel` 和 `flush` 方法。

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `throttle` 可与 lodash 完全兼容。

- `throttle` 函数接收 `leading` 和 `trailing` 选项。

  - `leading`: 首次调用节流函数时是否立即执行原始函数。默认值为 `true`。
  - `trailing`: 自最后一次调用节流函数后经过 `throttleMs` 毫秒后是否执行原始函数。默认值为 `true`。

- `throttleMs` 选项的默认值为 `0`。意味着函数调用只延迟到下一个 tick。

::: info `throttle` 的 `leading` 和 `trailing` 选项

默认情况下 `throttle` 的 `leading` 和 `trailing` 选项为 `true`。因此像 `{ leading: true }` 或 `{ trailing: true }` 这样的选项不会改变函数的行为。

:::

```typescript
// leading 选项示例
const leadingFn = throttle(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 立即打印 'Leading function executed'
// 即使继续调用也每秒打印一次 'Leading function executed'
leadingFn();

// trailing 选项示例
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 立即打印 'Trailing function executed'
// 即使继续调用也每秒打印一次 'Trailing function executed'
trailingFn();

// leading: false, trailing: true 选项示例
const trailingOnlyFn = throttle(
  () => {
    console.log('Trailing-only function executed');
  },
  1000,
  { leading: false, trailing: true }
);

// 'Trailing-only function executed' 最初不会打印
// 即使继续调用也每秒打印一次 'Trailing-only function executed'
trailingOnlyFn();
```
