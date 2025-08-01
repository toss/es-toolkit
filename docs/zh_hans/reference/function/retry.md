# retry

`Promise`返回的函数会在成功之前进行重试。您可以设置重试次数和每次重试之间的间隔。

## 签名

```typescript
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, retries: number): Promise<T>;
function retry<T, E>(func: () => Promise<T>, { retries, delay, signal }: RetryOptions): Promise<T>;
```

### 参数

- `func` (`() => Promise<T>`): 一个返回 `Promise` 的函数。
- `retries`: 重试的次数。默认值为 `Number.POSITIVE_INFINITY`，即会一直重试直到成功。
- `delay`: 每次重试之间的间隔。可以是毫秒数，也可以是一个根据当前重试次数 (`attempts`) 动态计算的函数。默认值为 `0`。
- `signal`: 一个可以用来取消重试的 `AbortSignal`。
- `shouldRetry`: 当发生错误时判断是否应该重试的函数。形式为 `(error: E) => boolean`，接收错误并返回 `true` 时进行重试，返回 `false` 时停止重试。默认值为 `() => true`，对所有错误都进行重试。

### 返回值

(`Promise<T>`): `func` 返回的值。

### 错误

如果重试次数达到 `retries` 或被 `AbortSignal` 取消，则抛出错误。

另外，如果 `shouldRetry` 返回 `false`，也会抛出错误。

## 示例

```typescript
// 一直重试直到 fetchData 成功
const data1 = await retry(() => fetchData());
console.log(data1);

// 最多重试 3 次
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// 每次重试之间间隔 100 毫秒，最多重试 3 次
const data3 = await retry(() => fetchData(), { retries: 3, delay: 100 });
console.log(data3);

// 使用函数动态设置重试间隔（例如每次增加 50ms）
const data4 = await retry(() => fetchData(), {
  retries: 5,
  delay: attempts => attempts * 50,
});
console.log(data4);

// 可通过 AbortSignal 取消重试
const controller = new AbortController();
const data5 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data5);

// 仅在发生网络错误时重试
const data6 = await retry(() => fetchData(), {
  retries: 3,
  shouldRetry: error => isNetworkError(error),
});
console.log(data6);
```
