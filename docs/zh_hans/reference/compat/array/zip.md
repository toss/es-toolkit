# zip (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [zip](../../array/zip.md)

此 `zip` 函数由于为 Lodash 兼容性进行额外处理而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [zip](../../array/zip.md)。

:::

将多个数组组合成一个元组数组。

```typescript
const result = zip([1, 2], ['a', 'b']);
// result 是 [[1, 'a'], [2, 'b']]。
```

## 用法

### `zip(...arrs)`

接受多个数组并将每个索引处的元素分组为一个元组来创建一个新数组。如果输入数组的长度不同,结果数组的长度将与最长输入数组的长度相匹配,缺失的元素用 `undefined` 填充。

```typescript
import { zip } from 'es-toolkit/compat';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// 返回: [[1, 'a'], [2, 'b'], [3, 'c']]

// 不同长度的数组
const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// 返回: [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]

// 包含空数组
zip([1, 2], [], ['a', 'b']);
// 返回: [[1, undefined, 'a'], [2, undefined, 'b']]
```

#### 参数

- `...arrs` (`any[][]`): 要组合的数组。

#### 返回值

(`any[][]`): 包含输入数组每个索引元素的元组的新数组。
