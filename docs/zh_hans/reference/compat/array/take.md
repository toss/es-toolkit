# take (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [take](../../array/take.md)

这个 `take` 函数由于包含与 Lodash 兼容的额外处理而运行较慢。

请使用更快且现代的 `es-toolkit` 的 [take](../../array/take.md) 代替。

:::

从数组开头获取指定数量的元素并创建一个新数组。

```typescript
const result = take([1, 2, 3, 4, 5], 3);
// result 变为 [1, 2, 3]。
```

## 用法

### `take(array, count)`

从数组开头获取指定数量的元素并返回一个新数组。如果 `count` 大于数组长度,则返回整个数组。

```typescript
import { take } from 'es-toolkit/compat';

// 基本用法
const numbers = [1, 2, 3, 4, 5];
const result1 = take(numbers, 3);
// Returns: [1, 2, 3]

// 请求的数量大于数组长度
const result2 = take(numbers, 10);
// Returns: [1, 2, 3, 4, 5] (整个数组)

// 请求 0 个元素
const result3 = take(numbers, 0);
// Returns: []

// 处理空数组
const result4 = take([], 3);
// Returns: []

// 处理负数
const result5 = take(numbers, -1);
// Returns: []
```

#### 参数

- `array` (`T[]`): 要获取元素的数组。
- `count` (`number`): 要获取的元素数量。默认值为 1。

#### 返回值

(`T[]`): 包含从开头获取的指定数量元素的新数组。
