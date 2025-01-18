# retry

`Promise`返回的函数会在成功之前进行重试。您可以设置重试次数和每次重试之间的间隔。

## 签名

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### 参数

- `func` (`() => Promise<T>`): 一个返回 `Promise` 的函数。
- `retries`: 重试的次数。默认值为 `Number.POSITIVE_INFINITY`，即会一直重试直到成功。
- `delay`: 重试之间的间隔，单位为毫秒(ms)，默认值为 `0`。
- `signal`: 一个可以用来取消重试的 `AbortSignal`。

### 返回值

(`Promise<T>`): `func` 返回的值。

### 错误

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
