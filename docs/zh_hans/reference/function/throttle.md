# throttle

创建一个节流函数，每隔 `throttleMs` 毫秒最多调用一次提供的函数。

在等待时间内，对节流函数的后续调用不会触发原始函数的执行。

## 签名

```typescript
function throttle<F extends (...args: any[]) => void>(
  func: F,
  throttleMs: number,
  options?: ThrottleOptions
): ((...args: Parameters<F>) => void) & {
  cancel: () => void;
  flush: () => void;
};
```

### 参数

- `func` (`F`): 要节流的函数。
- `throttleMs` (`number`): 节流执行的毫秒数。
- `options` (`DebounceOptions`, 可选): 一个选项对象。
  - `signal` (`AbortSignal`, 可选): 可选的 `AbortSignal` 对象，用于取消防抖函数的执行。
  - `edges` (`Array<'leading' | 'trailing'>`, 可选): 一个数组，指定函数应在何时被调用。默认为 `['leading', 'trailing']`。
    - `'leading'`: 如果包含，函数将在第一次调用时立即执行。
    - `'trailing'`: 如果包含，函数将在距离上次调用 debounceMs 毫秒后执行。
    - 如果同时包含 `'leading'` 和 `'trailing'`，函数将在延迟周期的开始和结束时都被调用。然而，必须在 `debounceMs` 毫秒内至少调用两次才能发生这种情况，因为一次防抖函数调用不能触发函数两次。

### 返回值

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; }`): 一个新的节流函数，具有管理执行的方法。

- `cancel` (`() => void`): 取消任何待定的节流函数执行。
- `flush` (`() => void`): 立即调用节流函数，执行任何待处理的调用。

## 示例

### 基本用法

```typescript
const throttledFunction = throttle(() => {
  console.log('函数执行了');
}, 1000);

// 将立即记录 '函数执行了'
throttledFunction(); // 第一次调用立即触发执行

// 将在1秒后记录 '函数执行了'
throttledFunction(); // 第二次调用在节流周期内，但由于尾部行为在1秒后触发

// 2秒后
setTimeout(() => {
  throttledFunction(); // 将再次记录 '函数执行了'
}, 2000); // 这将记录，因为节流周期已经过去
```

### 窗口事件的使用示例

```typescript
// 要节流的示例函数
const logResize = () => {
  console.log('窗口在', new Date().toISOString(), '时被调整大小');
};

// 创建 logResize 函数的节流版本
const throttledResizeHandler = throttle(logResize, 1000);

// 将节流函数附加到窗口调整大小事件
window.addEventListener('resize', throttledResizeHandler);

// 可选：在不再需要时清理事件监听器
const cleanup = () => {
  window.removeEventListener('resize', throttledResizeHandler);
};

// 示例：在10秒后清理
setTimeout(cleanup, 10000);
```

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `throttle` 以实现与 lodash 的完全兼容。

- `throttle` 函数接受 `leading` 和 `trailing` 选项：

  - `leading`：如果为 true，则函数在第一次调用时立即运行。（默认为 `true`）
  - `trailing`：如果为 true，则函数在上次调用后的 `throttleMs` 毫秒后运行。（默认为 `true`）

- 默认情况下，`throttleMs` 选项设置为 `0`，这意味着函数执行仅延迟到下一个 tick。

::: info `throttle` 的 `leading` 和 `trailing` 选项

默认情况下，`throttle` 的 `leading` 和 `trailing` 选项都设置为 `true`，因此指定 `{ leading: true }` 或 `{ trailing: true }` 不会改变任何内容。

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

// 立即记录 'Leading function executed'。
// 即使连续调用，每1秒记录一次 'Leading function executed'。
leadingFn();

// trailing 选项示例
const trailingFn = throttle(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 立即记录 'Trailing function executed'。
// 即使连续调用，每1秒记录一次 'Trailing function executed'。
trailingFn();
```
