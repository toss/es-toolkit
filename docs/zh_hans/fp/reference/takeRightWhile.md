# takeRightWhile (函数式编程)

创建一个在谓词通过时获取末尾值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, takeRightWhile(predicate));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`takeRightWhile`](../../reference/array/takeRightWhile.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`takeRightWhile` 会从管道中数组的末尾开始遍历,并在 `predicate` 返回 `true` 时保留值。遇到第一个不满足条件的值时停止。

```typescript
import { pipe, takeRightWhile } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  takeRightWhile(value => value > 2)
); // => [3, 4]
```

#### 参数

- `predicate` (`(item: T) => boolean`): 判断是否应保留末尾值的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为通过条件的末尾值数组的函数。
