# flatMapAsync

使用异步函数转换数组的每个元素，并将结果展平一层以返回新数组。

```typescript
const result = await flatMapAsync(array, callback);
```

## 参考

### `flatMapAsync(array, callback, options?)`

当执行每个元素返回多个值的异步转换时，使用 `flatMapAsync`。它等同于调用 `mapAsync` 后再调用 `flat()`，但更高效。

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 获取每个用户的帖子并合并到一个数组中。
const users = [{ id: 1 }, { id: 2 }];
const allPosts = await flatMapAsync(users, async user => {
  return await fetchUserPosts(user.id);
});
// 返回：[post1, post2, post3, ...]（所有用户的帖子在一个数组中）

// 限制并发数。
const numbers = [1, 2, 3];
const results = await flatMapAsync(numbers, async n => await fetchRelatedItems(n), { concurrency: 2 });
// 最多同时执行 2 个操作。
```

每个回调函数必须返回一个数组，所有返回的数组将合并到一个数组中。`concurrency` 选项允许您限制并发执行以管理服务器负载。

```typescript
import { flatMapAsync } from 'es-toolkit/array';

// 获取每个类别的产品列表并合并到一个数组中。
const categories = ['electronics', 'books', 'clothing'];
const products = await flatMapAsync(categories, async category => await fetchProducts(category), { concurrency: 2 });
// 返回：包含所有类别产品的单个数组
```

#### 参数

- `array` (`readonly T[]`)：要转换的数组。
- `callback` (`(item: T, index: number, array: readonly T[]) => Promise<R[]>`)：将每个元素转换为数组的异步函数。
- `options` (`FlatMapAsyncOptions`, 可选)：控制并发的选项。
  - `concurrency` (`number`, 可选)：最大并发操作数。如果未指定，所有操作将并发执行。

### 返回值

(`Promise<R[]>`)：一个 Promise，解析为展平一层的转换值数组。
