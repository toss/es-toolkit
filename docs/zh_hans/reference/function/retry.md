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
- `retries`: 重试次数。默认值为 `Number.POSITIVE_INFINITY`，表示会一直重试直到成功。
- `retryMinDelay`: 两次重试之间的最小间隔（以毫秒为单位）。默认值为 `0`。
- `retryMaxDelay`: 两次重试之间的最大间隔（以毫秒为单位）。默认值为 `Infinity`。
- `factor`: 用于调整重试间隔的倍数因子。默认值为 `1`。
- `randomize`: 是否在 `factor` 的基础上增加随机延迟。默认值为 `false`。
- `signal`: 一个可以用来取消重试的 `AbortSignal`。

### 返回值

(`Promise<T>`): `func` 返回的值。

### 错误

如果重试次数达到 `retries` 则抛出错误

## 示例

```typescript
// 无限重试，直到 `fetchData` 成功。
const data1 = await retry(() => fetchData());
console.log(data1);

// 最多重试3次，直到 `fetchData` 成功。
const data2 = await retry(() => fetchData(), 3);
console.log(data2);

// 最多重试3次，每次重试间隔固定为100毫秒。
const data3 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100 });
console.log(data3);

// 重试间隔按照指数倍数递增（100ms, 200ms, 400ms）。
const data4 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, factor: 2 });
console.log(data4);

// 带指数递增和随机化的重试间隔（100~200ms）。
// 每次重试的间隔计算如下：
// 1. 基本间隔为 `retryMinDelay * factor^attempt`。
// 2. 计算出的间隔被限制在 `retryMaxDelay` 以内。
// 3. 如果 `randomize` 为 true，间隔会在 1~2 倍之间随机化。
//
// 示例：
// - 第一次重试: 100~200ms
// - 第二次重试: 200~400ms
// - 第三次重试: 400~800ms
const data5 = await retry(() => fetchData(), { retries: 3, retryMinDelay: 100, retryMaxDelay: 1000, randomize: true });
console.log(data5);

const controller = new AbortController();

// 可以使用 `signal` 取消重试操作。
const data6 = await retry(() => fetchData(), { signal: controller.signal });
console.log(data6);

```
