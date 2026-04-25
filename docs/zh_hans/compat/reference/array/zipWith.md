# zipWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [zipWith](../../array/zipWith.md)

此 `zipWith` 函数由于为 Lodash 兼容性进行额外处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [zipWith](../../array/zipWith.md)。

:::

使用组合函数将多个数组的元素组合成一个新数组。

```typescript
const result = zipWith([1, 2], [3, 4], (a, b) => a + b);
// result 是 [4, 6]。
```

## 用法

### `zipWith(...arrs, iteratee)`

接受多个数组并使用提供的函数组合每个索引处的元素来创建一个新数组。如果数组的长度不同,它将处理到最长数组的长度,对于缺失的值传递 `undefined`。

```typescript
import { zipWith } from 'es-toolkit/compat';

// 将两个数组的元素相加
const result1 = zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// 返回: [5, 7, 9]

// 组合三个数组的元素
const result2 = zipWith([1, 2], [3, 4], [5, 6], (a, b, c) => a + b + c);
// 返回: [9, 12]

// 不同长度的数组
const result3 = zipWith([1, 2, 3], [4, 5], (a, b) => (a || 0) + (b || 0));
// 返回: [5, 7, 3]
```

#### 参数

- `...arrs` (`any[][]`): 要组合的数组。
- `iteratee` (`Function`): 组合每个索引处元素的函数。

#### 返回值

(`any[]`): 应用组合函数的结果组成的新数组。
