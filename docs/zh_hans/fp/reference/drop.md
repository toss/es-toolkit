# drop (函数式编程)

创建一个从数组开头丢弃值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, drop(count));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`drop`](../../reference/array/drop.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`drop` 会从管道中的数组开头移除 `count` 个值。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { drop, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], drop(2)); // => [3, 4]
```

#### 参数

- `count` (`number`): 要从开头移除的值数量。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为剩余值数组的函数。
