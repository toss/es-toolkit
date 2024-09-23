# withTimeout

如果响应时间晚于指定时间， 则将其视为 `TimeoutError` 错误。

该函数返回一个 `Promise`，如果响应时间超过特定时间，则会以 `TimeoutError` 错误拒绝。在使用 async/await 函数时，可以通过该函数设置函数的最大执行时间。

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
async function fetchData() {
  const response = await fetch('https://example.com/data');
  return response.json();
}

try {
  const data = await withTimeout(fetchData, 1000);
  console.log(data); // 如果 `fetchData` 在 1 秒内解决，将记录获取的数据。
} catch (error) {
  console.error(error); // 如果 `fetchData` 在 1 秒内没有解决，将记录 'TimeoutError'。
}
```
