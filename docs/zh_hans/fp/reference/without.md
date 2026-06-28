# without (函数式编程)

创建一个从数组中移除指定值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, without(...values));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`without`](../../reference/array/without.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`without` 会从管道中的数组移除所有等于 `values` 中任意值的值。它在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { pipe, without } from 'es-toolkit/fp';

pipe([1, 2, 3, 2], without(2)); // => [1, 3]
```

#### 参数

- `values` (`T[]`): 要从管道中的数组移除的值。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为不含 `values` 的数组的函数。
