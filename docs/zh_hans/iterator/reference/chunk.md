# chunk (用于 `Iterator`)

惰性地将迭代器的元素分组为指定长度的数组。

```typescript
const chunks = chunk(source, size);
```

## 用法

### `chunk(source, size)`

当你想按固定大小的批次处理元素流时,请使用 `chunk`——例如,每次向数据库保存 100 条记录。每个分块只有在被请求时才会产生,因此在用原生 `take` 这样的短路辅助方法限制范围时,它也适用于无限迭代器。当源的长度不是 `size` 的整数倍时,最后一个分块会包含剩余的元素,因此它可能更短。

```typescript
import { chunk } from 'es-toolkit/iterator';

// 将元素两两分组;剩下的元素构成一个更短的最后分块。
chunk([1, 2, 3, 4, 5].values(), 2).toArray();
// 返回: [[1, 2], [3, 4], [5]]

// 用 take 限制范围,按批次处理无限数据源。
chunk(sensorReadings(), 100).take(2).toArray();
// 返回: 前两批各 100 条读数
```

#### 参数

- `source` (`Iterator<T>`): 要拆分为分块的迭代器。
- `size` (`number`): 每个分块的长度;必须是大于零的整数。

#### 返回值

(`IteratorObject<T[], undefined>`): 一个惰性迭代器,产生最多包含 `size` 个元素的数组。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

#### 异常

如果 `size` 不是大于零的整数,则抛出错误。

### 在 `pipe` 中使用 `chunk(size)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它只接收 `size`,并返回一个接收迭代器的函数。

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 返回: [[1, 2], [3, 4], [5]]
```
