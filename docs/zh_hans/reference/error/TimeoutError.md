# TimeoutError

表示已超时操作的错误类。

```typescript
const error = new TimeoutError(message);
```

## 用法

### `new TimeoutError(message?)`

当操作的时间限制超过时使用的错误类。当像 [timeout](../promise/timeout.md) 或 [withTimeout](../promise/withTimeout.md) 这样的操作超时时会抛出此错误。

```typescript
import { TimeoutError } from 'es-toolkit/error';

// 使用默认消息创建错误。
throw new TimeoutError();
// 错误消息: 'The operation was timed out'

// 使用自定义消息创建错误。
throw new TimeoutError('API 请求已超时');
// 错误消息: 'API 请求已超时'
```

与超时一起使用的示例。

```typescript
import { timeout, TimeoutError } from 'es-toolkit';

async function fetchWithTimeout(url: string) {
  try {
    const response = await timeout(() => fetch(url), 3000);
    return response;
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.log('请求已超时');
    }
    throw error;
  }
}

// 如果超过3秒则抛出 TimeoutError
await fetchWithTimeout('https://example.com/api/slow');
```

#### 参数

- `message` (`string`, 可选): 错误消息。默认为 `'The operation was timed out'`。

#### 返回值

(`TimeoutError`): 返回表示已超时操作的错误实例。它继承自 `Error`,`name` 属性为 `'TimeoutError'`。
