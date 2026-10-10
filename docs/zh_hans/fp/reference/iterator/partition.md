# partition (`Iterator`)

创建一个函数，消费迭代器并按谓词将其元素拆分为两个数组。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, partition(predicate));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`partition`](../../../reference/iterator/partition.md)：`partition(source, predicate)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `partition(predicate)`

`partition` 是迭代器流水线的一个终结步骤：它会拉取所有元素，`predicate` 返回真值时把元素放入第一个数组，否则放入第二个数组。因为它会消费整个迭代器，所以不能用于无限迭代器。

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

// 将数字分为偶数和奇数。
pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 返回: [[2, 4], [1, 3]]
```

#### 参数

- `predicate` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用；返回真值时将该元素放入第一个数组。

#### 返回值

(`(source: Iterator<T>) => [T[], T[]]`): 一个消费迭代器并返回由 `[matched, unmatched]` 两个数组组成的二元组的函数。
