# union (函数式编程)

创建一个合并两个数组并去除重复值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, union(secondArray));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`union`](../../reference/array/union.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`union` 先返回管道中数组的唯一值,再返回 `secondArray` 中尚未出现的值。

```typescript
import { pipe, union } from 'es-toolkit/fp';

pipe([1, 2, 2], union([2, 3])); // => [1, 2, 3]
```

#### 参数

- `secondArray` (`readonly T[]`): 要接在管道中数组之后合并的数组。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为两个数组并集的函数。
