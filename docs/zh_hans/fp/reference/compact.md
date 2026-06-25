# compact (函数式编程)

创建一个从数组中移除假值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, compact());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`compact`](../../reference/array/compact.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`compact` 会移除 `false`、`null`、`undefined`、`0`、`-0`、`0n`、空字符串和 `NaN`。它在 [`pipe`](./pipe.md) 中支持惰性求值,因此末尾的 `take` 可以提前停止遍历。

```typescript
import { compact, pipe } from 'es-toolkit/fp';

pipe([0, 1, false, 2, '', 3], compact()); // => [1, 2, 3]
```

#### 参数

此函数不接收参数;请以 `compact()` 的形式调用。

#### 返回值

(`(array: readonly T[]) => Array<NotFalsey<T>>`): 一个将 `readonly T[]` 映射为不含假值数组的函数。
