# timeout

返回一个在指定时间后抛出 `TimeoutError` 的 `Promise`。

```typescript
await timeout(ms, options?);
```

## 用法

### `timeout(ms, options?)`

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

您可以传入 `AbortSignal` 来取消超时。与 `delay` 不同,中断不会拒绝 Promise。由于 `timeout` 仅用于在 `Promise.race()` 中落败,取消它会让 Promise 保持挂起状态,使其所保护的操作能够在没有时间限制的情况下完成。

```typescript
const controller = new AbortController();

// 当用户选择继续等待时,解除 1 秒的限制。
keepWaitingButton.onclick = () => controller.abort();

const result = await Promise.race([
  doWork(),
  timeout(1000, { signal: controller.signal }), // 中断后不会被拒绝
]);
```

#### 参数

- `ms` (`number`): 抛出 `TimeoutError` 前的毫秒数。
- `options` (`TimeoutOptions`, 可选): 超时选项。
  - `signal` (`AbortSignal`, 可选): 可以取消超时的 AbortSignal。中断后,返回的 Promise 保持挂起状态且不会被拒绝。

#### 返回值

(`Promise<never>`): 返回一个在指定时间后以 `TimeoutError` 拒绝的 Promise。如果 `AbortSignal` 先被中断,该 Promise 永远不会结束。

#### 错误

指定时间过后,抛出 `TimeoutError`。中断 `AbortSignal` 不会抛出错误,而是取消超时,使 Promise 保持挂起状态。
