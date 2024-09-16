# throttle

创建一个节流函数，每隔 `throttleMs` 毫秒最多调用一次提供的函数。

在等待时间内，对节流函数的后续调用不会触发原始函数的执行。

## 签名

```typescript
function throttle<F extends (...args: any[]) => void>(func: F, throttleMs: number): (...args: Parameters<F>) => void;
```

### 参数

- `func` (`F`): 要节流的函数。
- `throttleMs` (`number`): 节流执行的毫秒数。

### 返回值

(`(...args: Parameters<F>) => void`): 一个新的节流函数。

## 示例

```typescript
const throttledFunction = throttle(() => {
  console.log('Function executed');
}, 1000);

// 立即输出 'Function executed'
throttledFunction();

// 由于在节流时间内，不会输出任何内容
throttledFunction();

// 1秒后
setTimeout(() => {
  throttledFunction(); // 输出 'Function executed'
}, 1000);
```

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `throttle` 以实现与 lodash 的完全兼容。

- `throttle` 函数接受 `leading` 和 `trailing` 选项：

  - `leading`：如果为 true，则函数在第一次调用时立即运行。（默认为 `true`）
  - `trailing`：如果为 true，则函数在上次调用后的 `throttleMs` 毫秒后运行。（默认为 `true`）
  - 如果 `leading` 和 `trailing` 都为 true，则函数会在延迟期的开始和结束时运行。然而，必须在 `throttleMs` 毫秒内至少调用两次才能实现这一点，因为一次节流函数调用不能触发函数两次。

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
