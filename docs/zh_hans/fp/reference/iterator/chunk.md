# chunk (`Iterator`)

创建一个函数，惰性地将迭代器的元素分组为指定长度的数组。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, chunk(size));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`chunk`](../../../reference/iterator/chunk.md)：`chunk(source, size)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `chunk(size)`

`chunk` 接收一个长度，并返回一个函数：把迭代器的元素按这个长度分组为数组。每个数组只有在被拉取时才会生成，最后一个数组可能更短。

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

// 将数字两两分组。
pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 返回: [[1, 2], [3, 4], [5]]
```

#### 参数

- `size` (`number`): 每个分块的长度；必须是大于零的整数。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T[], undefined>`): 一个将迭代器映射为最多包含 `size` 个元素的数组的惰性迭代器的函数。

#### 错误

如果 `size` 不是大于零的整数，则抛出错误。
