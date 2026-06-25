# difference (函数式编程)

创建一个排除另一个数组中已有值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, difference(secondArray));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`difference`](../../reference/array/difference.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`difference` 会保留管道中数组里不存在于 `secondArray` 的值,并保留管道中数组的顺序。

```typescript
import { difference, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], difference([2, 4])); // => [1, 3]
```

#### 参数

- `secondArray` (`readonly T[]`): 包含要排除值的数组。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为不在 `secondArray` 中的值数组的函数。
