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
