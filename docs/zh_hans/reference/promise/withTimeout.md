# withTimeout

为异步函数设置时间限制,如果在指定时间内未完成,则抛出 `TimeoutError`。

```typescript
await withTimeout(run, ms, options?);
```

## 用法

### `withTimeout(run, ms, options?)`

当您想要为异步任务设置超时时,可以使用 `withTimeout`。如果 Promise 在指定时间内未完成,将以 `TimeoutError` 拒绝,从而防止无限等待的情况。

```typescript
import { withTimeout } from 'es-toolkit/promise';

async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

try {
  // 必须在 1 秒内完成
  const data = await withTimeout(fetchData, 1000);
  console.log('收到数据:', data);
} catch (error) {
  if (error.name === 'TimeoutError') {
    console.log('请求超时');
  }
}
```

当您想要为数据库查询设置时间限制时也可以使用。

```typescript
async function queryDatabase(query: string) {
  // 数据库查询逻辑
  return await db.execute(query);
}

try {
  const result = await withTimeout(
    () => queryDatabase('SELECT * FROM users'),
    5000 // 5秒限制
  );
  console.log('查询结果:', result);
} catch (error) {
  console.log('查询耗时过长已取消');
}
```

在多个 API 调用中只想接收最快响应的情况下也可以使用。

```typescript
async function getFastestResponse() {
  const apis = [() => fetch('/api/server1'), () => fetch('/api/server2'), () => fetch('/api/server3')];

  try {
    // 为每个 API 设置 2 秒限制,只接收最快的响应
    const promises = apis.map(api => withTimeout(api, 2000));
    const result = await Promise.race(promises);
    return result.json();
  } catch (error) {
    console.log('所有 API 均已超时');
  }
}
```

您可以传入 `AbortSignal` 来取消超时。中断它会解除时间限制,因此会在没有截止时间的情况下等待 `run`。它不会拒绝返回的 Promise,也不会中断 `run` 本身;如果您也想取消实际的工作,请将同一个信号传入 `run`。

```typescript
const controller = new AbortController();

// 当用户选择继续等待时,解除 1 秒的限制。
keepWaitingButton.onclick = () => controller.abort();

const data = await withTimeout(fetchData, 1000, { signal: controller.signal });
```

#### 参数

- `run` (`() => Promise<T>`): 要执行的异步函数。
- `ms` (`number`): 超时前的毫秒数。
- `options` (`WithTimeoutOptions`, 可选): 超时选项。
  - `signal` (`AbortSignal`, 可选): 可以取消超时的 AbortSignal。中断后,时间限制将被解除,并在没有截止时间的情况下等待 `run`。

#### 返回值

(`Promise<T>`): 返回给定异步函数的结果,或在超时时以 TimeoutError 拒绝的 Promise。

#### 错误

如果在指定时间内未完成,抛出 `TimeoutError`。
