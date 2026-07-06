# findLastIndex (函数式编程)

创建一个返回最后一个通过测试的值的索引的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, findLastIndex(predicate));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`findLastIndex` 会从管道中数组的末尾开始搜索,并返回第一个使 `predicate` 返回 `true` 的值的索引。如果没有匹配值,则返回 `-1`。

```typescript
import { findLastIndex, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  findLastIndex(value => value % 2 === 0)
); // => 3
```

#### 参数

- `predicate` (`(value: T, index: number) => boolean`): 测试每个值的函数。

#### 返回值

(`(array: readonly T[]) => number`): 一个将 `readonly T[]` 映射为最后一个匹配索引或 `-1` 的函数。
