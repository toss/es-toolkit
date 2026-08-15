# chunkBy (函数式编程)

创建一个在键发生变化时拆分相邻值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, chunkBy(iteratee));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`chunkBy` 从左到右遍历管道中的数组,并把 `iteratee` 返回相同键的相邻值分到同一组。键发生变化时会开始新的分块。

```typescript
import { chunkBy, pipe } from 'es-toolkit/fp';

pipe(
  [1, 1, 2, 2, 1],
  chunkBy(value => value)
); // => [[1, 1], [2, 2], [1]]
```

#### 参数

- `iteratee` (`(value: T) => unknown`): 为每个值返回分组键的函数。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将 `readonly T[]` 映射为相邻值分块数组的函数。
