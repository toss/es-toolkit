# chunk（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 [`chunk`](../../array/chunk.md)

此 `chunk` 函数由于处理 `null`、`undefined` 和默认 `size` 值等原因运行较慢。

请使用 `es-toolkit` 中更快、更现代的 [chunk](../../array/chunk.md) 实现。

:::

将数组划分为指定大小的较小数组。

```typescript
const chunked = chunk(arr, size);
```

## 用法

### `chunk(arr, size?)`

当你想要将一个长数组分割成多个相同大小的较小数组时，使用 `chunk`。如果数组不能被均匀分割，最后一个数组将包含剩余的元素。

```typescript
import { chunk } from 'es-toolkit/compat';

// 将数字数组分成大小为 2 的块。
chunk([1, 2, 3, 4], 2);
// 返回值：[[1, 2], [3, 4]]

// 将字符串数组分成大小为 3 的块。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// 返回值：[['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// 当不能均匀分割时
chunk([1, 2, 3, 4, 5], 2);
// 返回值：[[1, 2], [3, 4], [5]]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2);
// 返回值：[]

chunk(undefined, 2);
// 返回值：[]
```

如果大小为 0 或负数，返回空数组。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0);
// 返回值：[]

chunk([1, 2, 3], -1);
// 返回值：[]
```

#### 参数

- `arr` (`ArrayLike<T> | null | undefined`): 要划分的数组。
- `size` (`number`, 可选): 每个较小数组的大小。默认值为 `1`。

#### 返回值

(`T[][]`): 返回按大小 `size` 划分的二维数组。
