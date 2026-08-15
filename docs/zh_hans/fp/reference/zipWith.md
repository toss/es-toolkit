# zipWith (函数式编程)

创建一个按索引组合多个数组值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, zipWith(...arrs, combine));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`zipWith`](../../reference/array/zipWith.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`zipWith` 会把管道中的数组和配置数组在相同索引处的值传给 `combine`。如果数组长度不同,缺失值会以 `undefined` 传入。

```typescript
import { pipe, zipWith } from 'es-toolkit/fp';

pipe(
  [1, 2],
  zipWith([10, 20], (a, b) => a + b)
); // => [11, 22]

pipe(
  [1, 2, 3],
  zipWith([10], (a, b = 0) => a + b)
); // => [11, 2, 3]
```

#### 参数

- `arrs` (`Array<readonly unknown[]>`): 要与管道中的数组一起组合的数组。
- `combine` (`(...values: unknown[]) => R`): 接收相同索引处的值以及最后的索引并返回新值的函数。

#### 返回值

(`(array: readonly T[]) => R[]`): 一个将管道中的数组映射为组合值数组的函数。
