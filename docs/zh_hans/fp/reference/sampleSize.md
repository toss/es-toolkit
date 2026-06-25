# sampleSize (函数式编程)

创建一个从数组中返回多个随机值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, sampleSize(size));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`sampleSize`](../../reference/array/sampleSize.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`sampleSize` 从管道中的数组返回 `size` 个随机值,不会重复同一个数组位置。

```typescript
import { pipe, sampleSize } from 'es-toolkit/fp';

const values = pipe([1, 2, 3, 4], sampleSize(2));
// values has length 2 and contains values from the input array.
```

#### 参数

- `size` (`number`): 要返回的随机值数量。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为随机值数组的函数。

#### 异常

如果 `size` 大于管道中数组的长度,则抛出错误。
