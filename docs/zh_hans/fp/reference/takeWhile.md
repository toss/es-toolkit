# takeWhile (函数式编程)

创建一个在谓词通过时获取开头值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, takeWhile(predicate));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`takeWhile`](../../reference/array/takeWhile.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`takeWhile` 会从管道中数组的开头开始遍历,并在 `predicate` 返回 `true` 时保留值。它支持惰性求值,可以在 [`pipe`](./pipe.md) 中提前停止前面的惰性操作。

```typescript
import { pipe, takeWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  takeWhile(value => value < 3)
); // => [1, 2]
```

#### 参数

- `predicate` (`(element: T, index: number) => boolean`): 判断是否应保留开头值的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为通过条件的开头值数组的函数。
