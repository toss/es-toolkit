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

### 返回值

(`((...args: Parameters<F>) => void) & { cancel: () => void }`): 一个带有 `cancel` 方法的新的防抖函数。

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
