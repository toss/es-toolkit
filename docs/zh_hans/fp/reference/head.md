# head (函数式编程)

创建一个返回数组第一个值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, head());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`head`](../../reference/array/head.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`head` 返回管道中数组的第一个值。如果数组为空,则返回 `undefined`。

```typescript
import { head, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3], head()); // => 1

pipe([], head()); // => undefined
```

#### 参数

此函数不接收参数;请以 `head()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => T | undefined`): 一个将 `readonly T[]` 映射为其第一个值的函数。
