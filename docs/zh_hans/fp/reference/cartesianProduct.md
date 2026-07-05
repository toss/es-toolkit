# cartesianProduct (函数式编程)

创建一个计算管道中数组与其他数组笛卡尔积的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, cartesianProduct(...arrs));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`cartesianProduct`](../../reference/array/cartesianProduct.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`cartesianProduct` 返回从管道中的数组和每个配置数组各取一个值所能组成的所有元组。最右侧的数组变化最快。

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

pipe([1, 2], cartesianProduct(['a', 'b'])); // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

pipe([], cartesianProduct(['a', 'b'])); // => []
```

#### 参数

- `arrs` (`Array<readonly T[]>`): 要接在管道中数组之后参与计算的数组。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将管道中的数组映射为笛卡尔积元组数组的函数。
