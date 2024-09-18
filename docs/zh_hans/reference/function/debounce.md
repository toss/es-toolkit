# debounce

创建一个防抖函数，它会延迟调用提供的函数，直到距离上次调用已过去 `debounceMs` 毫秒为止。

防抖函数还具有一个 `cancel` 方法，用于取消任何待定的执行。

## 签名

```typescript
function debounce<F extends (...args: any[]) => void>(
  func: F,
  debounceMs: number,
  options?: DebounceOptions
): ((...args: Parameters<F>) => void) & { cancel: () => void };
```

### 参数

- `func` (`F`): 要进行防抖处理的函数。
- `debounceMs` (`number`): 延迟执行的毫秒数。
- `options` (`DebounceOptions`, 可选): 一个选项对象。
  - `signal` (`AbortSignal`, 可选): 可选的 `AbortSignal` 对象，用于取消防抖函数的执行。
  - `edges` (`Array<'leading' | 'trailing'>`, 可选): 一个数组，指定函数应在何时被调用。默认为 `['trailing']`。
    - `'leading'`: 如果包含，函数将在第一次调用时立即执行。
    - `'trailing'`: 如果包含，函数将在距离上次调用 debounceMs 毫秒后执行。
    - 如果同时包含 `'leading'` 和 `'trailing'`，函数将在延迟周期的开始和结束时都被调用。然而，必须在 `debounceMs` 毫秒内至少调用两次才能发生这种情况，因为一次防抖函数调用不能触发函数两次。

### 返回值

(`((...args: Parameters<F>) => void) & { cancel: () => void; flush: () => void; schedule: () => void; }`): 一个新的防抖函数，具有管理执行的方法。

- `cancel` (`() => void`): 取消任何待定的防抖函数执行。
- `flush` (`() => void`): 立即调用防抖函数，执行任何待处理的调用。
- `schedule` (`() => void`): 在指定的防抖延迟后安排防抖函数的执行。

## 示例

### 基本用法

```typescript
const debouncedFunction = debounce(() => {
  console.log('Function executed');
}, 1000);

// 如果在此期间没有再次调用，则在1秒后输出 'Function executed'
debouncedFunction();

// 前一个调用被取消，因此不会记录任何内容
debouncedFunction.cancel();
```

### 使用 AbortSignal

```typescript
const controller = new AbortController();
const signal = controller.signal;
const debouncedWithSignalFunction = debounce(
  () => {
    console.log('Function executed');
  },
  1000,
  { signal }
);

// 如果在此期间没有再次调用，则在1秒后输出 'Function executed'
debouncedWithSignalFunction();

// 取消了防抖函数的调用
controller.abort();
```

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `debounce` 以实现与 lodash 的完全兼容。

- `debounce` 函数接受 `leading` 和 `trailing` 选项：

  - `leading`：如果为 true，则函数在第一次调用时立即运行。（默认为 `false`）
  - `trailing`：如果为 true，则函数在上次调用后的 `debounceMs` 毫秒后运行。（默认为 `true`）

- `debounce` 函数还接受 `maxWait` 选项：

  - 这是允许函数被延迟调用的最长时间。

- 默认情况下，`debounceMs` 选项设置为 `0`，这意味着函数执行仅延迟到下一个 tick。

::: info `{ leading: true }` 的含义

由于 `trailing` 默认为 `true`，将防抖设置为 `{ leading: true }` 会使 `leading` 和 `trailing` 都为 `true`。

:::

```typescript
// leading 选项示例
const leadingFn = debounce(
  () => {
    console.log('Leading function executed');
  },
  1000,
  { leading: true }
);

// 立即记录 'Leading function executed'。
leadingFn();

// trailing 选项示例
const trailingFn = debounce(
  () => {
    console.log('Trailing function executed');
  },
  1000,
  { trailing: true }
);

// 如果在此期间没有再次调用，则在1秒后记录 'Trailing function executed'。
trailingFn();

// maxWait 选项示例
const maxWaitFn = debounce(
  () => {
    console.log('MaxWait function executed');
  },
  1000,
  { maxWait: 2000 }
);

// 在2秒内记录 'MaxWait function executed'。
maxWaitFn();
setTimeout(maxWaitFn, 500);
setTimeout(maxWaitFn, 1000);
setTimeout(maxWaitFn, 1500);
setTimeout(maxWaitFn, 2000);
setTimeout(maxWaitFn, 2500);
setTimeout(maxWaitFn, 3000);
```
