# unzip (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [unzip](../../array/unzip.md)

此 `unzip` 函数由于处理 `null` 或 `undefined`、过滤非数组值等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [unzip](../../array/unzip.md)。

:::

将分组数组中相同位置的元素收集到新数组中。

```typescript
const result = unzip(array);
```

## 用法

### `unzip(array)`

收集嵌套数组中相同索引处的元素并将它们作为新数组返回。执行与 `zip` 函数相反的操作。这在转置矩阵或重组结构化数据时很有用。

```typescript
import { unzip } from 'es-toolkit/compat';

// 解压混合字符串、布尔值和数字的数组
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
];
const result = unzip(zipped);
// 返回: [['a', 'b'], [true, false], [1, 2]]

// 解压数字数组
const numbers = [
  [1, 4],
  [2, 5],
  [3, 6],
];
unzip(numbers);
// 返回: [[1, 2, 3], [4, 5, 6]]

// 处理不同长度的数组
const uneven = [
  ['a', 1],
  ['b', 2, true],
];
unzip(uneven);
// 返回: [['a', 'b'], [1, 2], [undefined, true]]
```

`null`、`undefined` 或空数组被视为空数组。

```typescript
import { unzip } from 'es-toolkit/compat';

unzip(null); // []
unzip(undefined); // []
unzip([]); // []
```

#### 参数

- `array` (`T[][] | ArrayLike<ArrayLike<T>> | null | undefined`): 要解压的嵌套数组。每个内部数组中相同位置的元素被收集在一起。

#### 返回值

(`T[][]`): 返回一个将相同位置的元素收集在一起的新数组。
