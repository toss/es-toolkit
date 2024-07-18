# withTimeout

如果响应时间晚于指定时间， 则将其视为 `TimeoutError`错误。

此函数返回一个 Promise，该 Promise 在指定超时后解析，允许您使用它 使用 async/await 来超时执行。

## 签名

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

### 参数

- `run` (`() => Promise<T>`): 要执行的 Promise 值。
- `ms` (`number`): 指定 Promise 的最大执行值的毫秒。

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
