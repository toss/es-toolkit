# maxBy (函数式编程)

创建一个返回计算分数最大的值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, maxBy(getValue));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`maxBy`](../../reference/array/maxBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`maxBy` 会对管道中数组的每个值调用 `getValue`,并返回结果最大的值。如果数组为空,则返回 `undefined`。

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ score: 10 }, { score: 30 }, { score: 20 }],
  maxBy(item => item.score)
); // => { score: 30 }
```

#### 参数

- `getValue` (`(item: T) => number`): 返回用于比较的值的函数。

#### 返回值

(`(array: readonly T[]) => T | undefined`): 一个将 `readonly T[]` 映射为最大项或 `undefined` 的函数。
