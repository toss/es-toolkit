# dropWhile (函数式编程)

创建一个在谓词通过时丢弃开头值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, dropWhile(predicate));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`dropWhile`](../../reference/array/dropWhile.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`dropWhile` 会从管道中数组的开头开始遍历,并在 `predicate` 返回 `true` 时移除值。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { dropWhile, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 1],
  dropWhile(value => value < 3)
); // => [3, 1]
```

#### 参数

- `predicate` (`(item: T, index: number) => boolean`): 判断是否应移除开头值的函数。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为从开头移除值后剩余数组的函数。
