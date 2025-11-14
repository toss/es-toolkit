# forEachAsync

对数组的每个元素执行异步函数。

```typescript
await forEachAsync(array, callback);
```

## 参考

### `forEachAsync(array, callback, options?)`

当需要对数组的每个元素执行具有副作用的异步操作时，使用 `forEachAsync`。与常规的 `forEach` 不同，它返回一个在所有异步操作完成时解析的 Promise。

```typescript
import { forEachAsync } from 'es-toolkit/array';

// 更新所有用户信息。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
await forEachAsync(users, async (user) => {
  await updateUser(user.id);
});
// 所有用户更新已完成。

// 限制并发数。
const items = [1, 2, 3, 4, 5];
await forEachAsync(
  items,
  async (item) => await processItem(item),
  { concurrency: 2 }
);
// 最多同时处理 2 个项目。
```

`concurrency` 选项允许您限制并发执行以控制服务器或数据库的负载。它适用于不返回值的操作，如日志记录、文件上传或数据库更新。

```typescript
import { forEachAsync } from 'es-toolkit/array';

// 顺序上传文件。
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
await forEachAsync(
  files,
  async (file) => await uploadFile(file),
  { concurrency: 1 }
);
// 一次只上传一个文件。
```

#### 参数

- `array` (`readonly T[]`)：要迭代的数组。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<void>`)：要为每个元素执行的异步函数。
- `options` (`ForEachAsyncOptions`, 可选)：控制并发的选项。
  - `concurrency` (`number`, 可选)：最大并发操作数。如果未指定，所有操作将并发执行。

### 返回值

(`Promise<void>`)：一个在所有操作完成时解析的 Promise。
