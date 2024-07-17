# withTimeout

如果响应时间晚于指定时间， 则将其视为 `TimeoutError`错误。

此函数返回一个 Promise，该 Promise 在指定超时后解析，允许您使用它 使用 async/await 来超时执行。

它还支持可选的 AbortSignal 来取消超时。

## 签名

```typescript
function withTimeout<T>(value: () => Promise<T>, ms: number, options?: WithTimeoutOptions): Promise<T>;
```

### 参数

- `value` (`() => Promise<T>`): 要执行的 Promise 值。
- `ms` (`number`): 指定 Promise 的最大执行值的毫秒。
- `options` (`WithTimeoutOptions`, optional): 一个选项对象。
  - `signal` (`AbortSignal`, optional): 用于取消 timeout 的选择性 `AbortSignal`。

### 返回值

(`Promise<T>`): 要执行的 Promise 返回值。

## 示例

### 基本用法

```typescript
try {
  await withTimeout(() => new Promise(() => {}), 1000); // 代码时间最长为 1秒
} catch (error) {
  console.error(error); // 将会输出 'The operation was timed out'
}
```

### 使用 AbortSignal

```typescript
const controller = new AbortController();
const { signal } = controller;

setTimeout(() => controller.abort(), 50); // 50ms 后取消 timeout
try {
  await withTimeout(() => new Promise(() => {}), 1000, { signal });
} catch (error) {
  console.log(error); // 将会输出 'The operation was aborted'
}
```
