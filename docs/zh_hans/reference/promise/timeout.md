# timeout

返回一个在指定时间后以 `TimeoutError` 错误拒绝的 `Promise`。

## 签名

```typescript
function timeout(ms: number): Promise<void>;
```

### 参数

- `ms` (`number`): 指定 Promise 的最大执行值的毫秒。

### 返回值

(`Promise<T>`): 要执行的 Promise 返回值。

## 示例

### 基本用法

```typescript
try {
  await timeout(1000); // 代码时间最长为 1秒
} catch (error) {
  console.error(error); // 将会输出 'The operation was timed out'
}
```
