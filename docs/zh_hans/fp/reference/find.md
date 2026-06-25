# find (函数式编程)

创建一个返回第一个通过测试的值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, find(predicate));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`find` 返回管道中数组里第一个使 `predicate` 返回 `true` 的值。如果没有匹配值,则返回 `undefined`。

```typescript
import { find, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  find(value => value > 2)
); // => 3
```

#### 参数

- `predicate` (`(value: T, index: number) => boolean`): 测试每个值的函数。

#### 返回值

(`(array: readonly T[]) => T | undefined`): 一个将 `readonly T[]` 映射为第一个匹配值或 `undefined` 的函数。
