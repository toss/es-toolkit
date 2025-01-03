# retry

该函数可以设置重试间隔以及重试次数，达到最大重试次数后抛出Error。

## 签名

```typescript
function retry<T>(func: () => Promise<T>, options: RetryOptions): T;
```

### 参数

- `func` (`F`): 重试的功能函数
- `options` (`RetryOptions`): 选项
  - `intervalMs`: 间隔延迟的毫秒数.
  - `retries`: 最大重试次数.

### 返回值

(`Awaited<ReturnType<F>>`): 函数返回值

### 异常

如果重试次数达到 `retries` 则抛出错误

## 示例

```typescript
async function getNumber() {
  return Promise.resolve(3);
}
async function getError() {
  return Promise.reject(new Error('MyFailed'));
}
// 将返回 3
await retry(getNumber, {
  intervalMs: 1000,
  retries: 2,
});
// 将抛出异常
await retry(getError, {
  intervalMs: 1000,
  retries: 2,
});
```
