# chunk

::: warning 使用 `es-toolkit` 的 `chunk` 函数

这个 `chunk` 函数由于需要处理 `null` 或 `undefined` 值、`size` 默认值等情况，运行效率较低。

请使用 `es-toolkit` 中更现代化的 [chunk](../../array/chunk.md) 实现。

:::

将数组拆分为指定大小的较小数组。

```typescript
const chunked = chunk(arr, size);
```

## 参考

### `chunk(arr, size)`

当你想将一个长数组分割成多个相同大小的较小数组时，使用 `chunk`。如果输入数组不能均匀分割，最后一个数组将包含剩余的元素。

```typescript
import { chunk } from 'es-toolkit/compat';

// 将数字数组拆分为最大大小为 2 的较小数组。
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// 将字符串数组拆分为最大大小为 3 的较小数组。
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

`null` 和 `undefined` 被视为空数组。

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2); // []
chunk(undefined, 2); // []
```

#### 参数

- `arr` (`ArrayLike<T>`): 要拆分为较小数组的数组。
- `size` (`number`，可选): 每个较小数组的最大大小。必须是正整数。默认值为 `1`。

### 返回值

(`T[][]`): 返回一个由最大大小为 `size` 的较小数组组成的二维数组。
