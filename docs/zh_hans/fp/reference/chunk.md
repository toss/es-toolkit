# chunk (函数式编程)

创建一个将数组拆分成指定长度子数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, chunk(size));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`chunk`](../../reference/array/chunk.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`chunk` 将数组划分成多个子数组,每个子数组的长度为 `size`。当数组无法被均匀划分时,最后一个分块会包含剩余的元素。

```typescript
import { chunk, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4, 5], chunk(2)); // => [[1, 2], [3, 4], [5]]

// `size` 大于数组长度时只会产生一个分块。
pipe([1, 2, 3], chunk(10)); // => [[1, 2, 3]]
```

#### 参数

- `size` (`number`): 每个分块的长度。必须是正整数。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将 `readonly T[]` 映射为由分块组成数组的函数。

#### 异常

如果 `size` 不是正整数,则抛出错误。
