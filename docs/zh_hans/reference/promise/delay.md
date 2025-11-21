# delay

延迟代码执行指定的时间。

```typescript
await delay(ms, options?);
```

## 用法

### `delay(ms, options?)`

当您想要暂停代码执行一定时间时,可以使用 `delay`。它可以与 async/await 一起使用,使下一段代码在一定时间后执行。如有必要,还可以通过 `AbortSignal` 取消延迟。

```typescript
import { delay } from 'es-toolkit/promise';

async function example() {
  console.log('开始');
  await delay(1000); // 延迟执行 1 秒
  console.log('1秒后执行');

  await delay(500); // 再延迟 0.5 秒
  console.log('额外 0.5 秒后执行');
}

example();
```

您也可以使用 AbortSignal 取消延迟:

```typescript
async function cancellableDelay() {
  const controller = new AbortController();
  const { signal } = controller;

  // 50ms 后取消延迟
  setTimeout(() => controller.abort(), 50);

  try {
    await delay(1000, { signal });
    console.log('1秒已过'); // 此代码不会执行
  } catch (error) {
    console.log('延迟已取消'); // 抛出 AbortError
  }
}
```

在测试中模拟异步行为时也很有用。

```typescript
async function simulateNetworkRequest() {
  console.log('开始网络请求...');
  await delay(2000); // 模拟 2 秒的网络延迟
  console.log('收到响应!');
  return { data: 'test' };
}
```

#### 参数

- `ms` (`number`): 要延迟的毫秒数。
- `options` (`DelayOptions`, 可选): 延迟选项。
  - `signal` (`AbortSignal`, 可选): 可以取消延迟的 AbortSignal。

#### 返回值

(`Promise<void>`): 返回一个在指定时间后完成的 Promise。

#### 错误

当 AbortSignal 激活时,抛出 `AbortError`。
