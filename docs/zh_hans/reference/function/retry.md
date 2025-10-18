# retry

重复执行返回 Promise 的函数直到成功。

```typescript
const result = await retry(asyncFunc, options);
```

## 参考

### `retry(func, options?)`

当异步函数失败时想要自动重试时,请使用 `retry`。这对于可能暂时失败的操作(如 API 调用或网络请求)很有用。

可以设置重试次数、重试间隔和取消信号。重试间隔可以是固定值,也可以是根据重试次数动态计算的函数。

```typescript
import { retry } from 'es-toolkit/function';

// 基本用法 (无限重试)
const data1 = await retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// 限制重试次数
const data2 = await retry(async () => {
  return await fetchData();
}, 3);

// 设置重试间隔 (100ms)
const data3 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 3,
    delay: 100,
  }
);

// 动态重试间隔 (指数退避)
const data4 = await retry(
  async () => {
    return await fetchData();
  },
  {
    retries: 5,
    delay: attempts => Math.min(100 * Math.pow(2, attempts), 5000),
  }
);
```

也可以使用 AbortSignal 取消重试。

```typescript
import { retry } from 'es-toolkit/function';

const controller = new AbortController();

// 5 秒后取消重试
setTimeout(() => controller.abort(), 5000);

try {
  const data = await retry(
    async () => {
      return await fetchData();
    },
    {
      retries: 10,
      delay: 1000,
      signal: controller.signal,
    }
  );
  console.log(data);
} catch (error) {
  console.log('重试被取消或失败:', error);
}
```

#### 参数

- `func` (`() => Promise<T>`): 要重试的异步函数。
- `options` (`number | RetryOptions`, 可选): 重试次数或选项对象。
  - `retries` (`number`, 可选): 重试次数。默认值为 `Infinity`,无限重试。
  - `delay` (`number | (attempts: number) => number`, 可选): 重试间隔(毫秒)。可以使用数字或函数。默认值为 `0`。
  - `signal` (`AbortSignal`, 可选): 可以取消重试的信号。

#### 返回值

(`Promise<T>`): 返回函数成功执行的结果值。

#### 错误

当重试次数超过或被 AbortSignal 取消时抛出最后的错误。
