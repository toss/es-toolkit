# dropRight (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `dropRight`

此 `dropRight` 函数由于处理 `null` 或 `undefined`、`guard` 参数处理、`toInteger` 转换等原因而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [`dropRight`](../../array/dropRight.md)。

:::

从数组的末尾删除指定数量的元素,返回一个新数组。

```typescript
const result = dropRight(array, itemsCount);
```

## 参考

### `dropRight(array, itemsCount)`

当您想从数组的末尾删除特定数量的元素并创建一个包含剩余元素的新数组时,使用 `dropRight`。

```typescript
import { dropRight } from 'es-toolkit/compat';

// 从数字数组中删除末尾的 2 个元素。
dropRight([1, 2, 3, 4, 5], 2);
// 返回: [1, 2, 3]

// 从字符串数组中删除末尾的 1 个元素。
dropRight(['a', 'b', 'c'], 1);
// 返回: ['a', 'b']

// 如果未指定要删除的数量,则使用默认值 1。
dropRight([1, 2, 3]);
// 返回: [1, 2]
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { dropRight } from 'es-toolkit/compat';

dropRight(null, 2); // []
dropRight(undefined, 2); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要删除元素的数组。
- `itemsCount` (`number`, 可选): 要从数组末尾删除的元素数量。默认为 `1`。

#### 返回值

(`T[]`): 返回从末尾删除 `itemsCount` 个元素的新数组。
