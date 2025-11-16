# filterAsync

使用异步条件函数过滤数组，返回仅包含满足条件的元素的新数组。

```typescript
const filtered = await filterAsync(array, predicate);
```

## 参考

### `filterAsync(array, predicate, options?)`

当需要使用 API 调用或数据库查询等异步操作过滤数组时，使用 `filterAsync`。与常规的 `filter` 不同，它支持异步条件函数，并可以通过 `concurrency` 选项限制并发执行数。

```typescript
import { filterAsync } from 'es-toolkit/array';

// 通过 API 检查用户状态，过滤出活跃用户。
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const activeUsers = await filterAsync(users, async user => {
  return await checkUserStatus(user.id);
});
// 返回：仅包含活跃用户的数组

// 限制并发数以减少服务器负载。
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = await filterAsync(numbers, async n => await isEvenAsync(n), { concurrency: 2 });
// 最多同时执行 2 个操作。
```

`concurrency` 选项有助于限制外部 API 调用或有效管理系统资源。如果未指定，所有操作将并发执行。

```typescript
import { filterAsync } from 'es-toolkit/array';

// 最多同时执行 3 个 API 调用。
const items = await filterAsync(largeArray, async item => await validateItem(item), { concurrency: 3 });
```

#### 参数

- `array` (`readonly T[]`)：要过滤的数组。
- `predicate` (`(item: T, index: number, array: readonly T[]) => Promise<boolean>`)：测试每个元素的异步函数。如果返回真值，该元素将包含在结果中。
- `options` (`FilterAsyncOptions`, 可选)：控制并发的选项。
  - `concurrency` (`number`, 可选)：最大并发操作数。如果未指定，所有操作将并发执行。

### 返回值

(`Promise<T[]>`)：一个 Promise，解析为仅包含条件函数返回真值的元素的新数组。
