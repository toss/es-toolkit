# withTimeout

为异步函数设置时间限制,如果在指定时间内未完成,则抛出 `TimeoutError`。

```typescript
await withTimeout(run, ms);
```

## 参考

### `withTimeout(run, ms)`

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

#### 参数

- `run` (`() => Promise<T>`): 要执行的异步函数。
- `ms` (`number`): 超时前的毫秒数。

#### 返回值

(`Promise<T>`): 返回给定异步函数的结果,或在超时时以 TimeoutError 拒绝的 Promise。

#### 错误

如果在指定时间内未完成,抛出 `TimeoutError`。
