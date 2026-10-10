# count (`Iterator`)

创建一个函数，消费迭代器并返回它产生的元素数量。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, count());
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`count`](../../../reference/iterator/count.md)：`count(source)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `count()`

`count` 是迭代器流水线的一个终结步骤：它会拉取所有元素，并返回一共有多少个。因为它会消费整个迭代器，所以不能用于无限迭代器。

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

// 统计偶数的个数。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// 返回: 2
```

#### 返回值

(`(source: Iterator<T>) => number`): 一个消费迭代器并返回它产生的元素数量的函数。
