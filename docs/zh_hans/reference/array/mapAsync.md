# mapAsync

使用异步函数转换数组的每个元素并返回新数组。

```typescript
const transformed = await mapAsync(array, callback);
```

## 参考

### `mapAsync(array, callback, options?)`

当需要对数组的每个元素执行异步转换操作时，使用 `mapAsync`。当您需要异步处理每个元素（如 API 调用或数据库查询）时很有用。

```typescript
import { mapAsync } from 'es-toolkit/array';

// 获取每个用户的详细信息。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const userDetails = await mapAsync(users, async (user) => {
  return await fetchUserDetails(user.id);
});
// 返回：[{ id: 1, name: '...' }, { id: 2, name: '...' }, { id: 3, name: '...' }]

// 限制并发数。
const numbers = [1, 2, 3, 4, 5];
const results = await mapAsync(
  numbers,
  async (n) => await slowOperation(n),
  { concurrency: 2 }
);
// 最多同时执行 2 个操作。
```

`concurrency` 选项允许您限制并发执行以控制服务器负载或遵守 API 速率限制。如果未指定，所有操作将并发执行。

```typescript
import { mapAsync } from 'es-toolkit/array';

// 转换大量图像，限制并发处理以考虑服务器负载。
const imageUrls = [...]; // 许多图像 URL
const processedImages = await mapAsync(
  imageUrls,
  async (url) => await processImage(url),
  { concurrency: 5 }
);
// 一次最多处理 5 个图像。
```

#### 参数

- `array` (`readonly T[]`)：要转换的数组。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R>`)：转换每个元素的异步函数。
- `options` (`MapAsyncOptions`, 可选)：控制并发的选项。
  - `concurrency` (`number`, 可选)：最大并发操作数。如果未指定，所有操作将并发执行。

### 返回值

(`Promise<R[]>`)：一个 Promise，解析为转换值的新数组。
