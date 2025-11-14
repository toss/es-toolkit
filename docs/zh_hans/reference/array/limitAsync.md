# limitAsync

创建一个新函数，限制异步函数的最大并发执行数。

```typescript
const limitedFunc = limitAsync(asyncFunc, concurrency);
```

## 参考

### `limitAsync(callback, concurrency)`

当您想限制多次调用的异步函数的并发执行数时，使用 `limitAsync`。只有指定数量的执行会并发运行，额外的调用会等待正在运行的操作完成。

```typescript
import { limitAsync } from 'es-toolkit/array';

// 限制最多 3 个并发请求。
const limitedFetch = limitAsync(async url => {
  return await fetch(url);
}, 3);

const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
await Promise.all(urls.map(url => limitedFetch(url)));
// 前 3 个首先执行，然后在它们完成时执行其余的。
```

它对控制资源密集型操作（如外部 API 调用或数据库查询）的负载很有用。当使用有速率限制的 API 或管理服务器负载时特别有效。

```typescript
import { limitAsync } from 'es-toolkit/array';

// 一次最多处理 2 个重计算。
const processItem = async item => {
  return await heavyComputation(item);
};

const limitedProcess = limitAsync(processItem, 2);
const items = [1, 2, 3, 4, 5];
await Promise.all(items.map(item => limitedProcess(item)));
// 最多同时处理 2 个项目。
```

#### 参数

- `callback` (`F extends (...args: any[]) => Promise<any>`)：要限制并发执行的异步函数。
- `concurrency` (`number`)：最大并发操作数。

### 返回值

(`F`)：一个应用了并发限制的新函数。它与原始函数具有相同的接口。
