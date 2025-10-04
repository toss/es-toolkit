# AbortError

表示已中止或已取消操作的错误类。

```typescript
const error = new AbortError(message);
```

## 参考

### `new AbortError(message?)`

当操作被中止或取消时使用的错误类。当像 [debounce](../function/debounce.md) 或 [delay](../promise/delay.md) 这样的操作被 `AbortSignal` 取消时会抛出此错误。

```typescript
import { AbortError } from 'es-toolkit/error';

// 使用默认消息创建错误。
throw new AbortError();
// 错误消息: 'The operation was aborted'

// 使用自定义消息创建错误。
throw new AbortError('文件上传已取消');
// 错误消息: '文件上传已取消'
```

与 AbortSignal 一起使用的示例。

```typescript
import { delay, AbortError } from 'es-toolkit';

async function fetchData(signal: AbortSignal) {
  try {
    await delay(1000, { signal });
    return '数据加载完成';
  } catch (error) {
    if (error instanceof AbortError) {
      console.log('操作已取消');
    }
    throw error;
  }
}

const controller = new AbortController();
controller.abort(); // 取消操作
await fetchData(controller.signal); // 抛出 AbortError
```

#### 参数

- `message` (`string`, 可选): 错误消息。默认为 `'The operation was aborted'`。

### 返回值

(`AbortError`): 返回表示已中止操作的错误实例。它继承自 `Error`,`name` 属性为 `'AbortError'`。
