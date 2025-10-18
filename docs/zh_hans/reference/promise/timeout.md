# timeout

返回一个在指定时间后抛出 `TimeoutError` 的 `Promise`。

```typescript
await timeout(ms);
```

## 参考

### `timeout(ms)`

当您想要在特定时间后抛出超时错误时,可以使用 `timeout`。与其他 Promise 配合 `Promise.race()` 使用,可以为任务设置时间限制,非常有用。

```typescript
import { timeout } from 'es-toolkit/promise';

// 基本用法 - 1秒后抛出 TimeoutError
try {
  await timeout(1000);
  console.log('此代码不会执行');
} catch (error) {
  console.log('发生超时错误:', error.message); // 'The operation was timed out'
}
```

可以与 `Promise.race()` 一起使用,为任务设置时间限制:

```typescript
async function fetchWithTimeout(url: string) {
  try {
    const result = await Promise.race([
      fetch(url),
      timeout(5000), // 5秒限制
    ]);
    return result;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('请求耗时过长');
    }
    throw error;
  }
}
```

当您想要在多个异步任务中任何一个未在规定时间内完成时使整个任务失败,也可以使用此方法。

```typescript
async function multipleOperationsWithTimeout() {
  try {
    await Promise.race([
      Promise.all([fetch('/api/data1'), fetch('/api/data2'), fetch('/api/data3')]),
      timeout(3000), // 为整个任务设置 3 秒限制
    ]);
    console.log('所有任务均按时完成');
  } catch (error) {
    console.log('任务未能按时完成');
  }
}
```

#### 参数

- `ms` (`number`): 抛出 `TimeoutError` 前的毫秒数。

#### 返回值

(`Promise<never>`): 返回一个在指定时间后以 `TimeoutError` 拒绝的 Promise。

#### 错误

指定时间过后,抛出 `TimeoutError`。
