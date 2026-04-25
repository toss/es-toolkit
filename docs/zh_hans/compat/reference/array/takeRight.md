# takeRight (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [takeRight](../../array/takeRight.md)

这个 `takeRight` 函数由于处理 `null` 或 `undefined` 等原因运行较慢。

请使用更快且现代的 `es-toolkit` 的 [takeRight](../../array/takeRight.md) 代替。

:::

从数组末尾获取指定数量的元素。

```typescript
const result = takeRight(array, count);
```

## 用法

### `takeRight(array, count)`

当您想要从数组末尾获取指定数量的元素来创建新数组时,使用 `takeRight`。如果请求的数量大于数组长度,则返回整个数组。

```typescript
import { takeRight } from 'es-toolkit/compat';

// 从数字数组中获取末尾的 2 个元素。
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 从字符串数组中获取末尾的 3 个元素。
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']

// 当请求的数量大于数组长度时
takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]

// 请求 0 个元素
takeRight([1, 2, 3], 0);
// Returns: []

// 请求负数
takeRight([1, 2, 3], -1);
// Returns: []
```

`null` 或 `undefined` 被视为空数组。

```typescript
import { takeRight } from 'es-toolkit/compat';

takeRight(null, 2); // []
takeRight(undefined, 2); // []
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要获取元素的数组。
- `count` (`number`, 可选): 要获取的元素数量。默认值为 `1`。

#### 返回值

(`T[]`): 返回包含从末尾获取的指定数量元素的新数组。
