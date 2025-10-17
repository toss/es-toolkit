# unzipWith (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `unzipWith`

此 `unzipWith` 函数由于处理 `null` 或 `undefined`、`ArrayLike` 类型处理、支持各种条件函数形式等而运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [unzipWith](../../array/unzipWith.md)。

:::

收集分组数组中相同位置的元素并应用转换函数来创建一个新数组。

```typescript
const result = unzipWith(array, iteratee);
```

## 参考

### `unzipWith(array, iteratee)`

收集嵌套数组中相同索引处的元素并应用转换函数。类似于 `unzip` 函数,但可以对每个组应用转换函数。如果未提供转换函数,则执行默认的 `unzip` 操作。

```typescript
import { unzipWith } from 'es-toolkit/compat';

// 将相同位置的元素相加
unzipWith(
  [
    [1, 10, 100],
    [2, 20, 200],
  ],
  (a, b) => a + b
);
// 返回: [3, 30, 300]

// 不使用转换函数(默认 unzip 操作)
unzipWith([
  [1, 4],
  [2, 5],
  [3, 6],
]);
// 返回: [[1, 2, 3], [4, 5, 6]]

// 字符串连接
unzipWith(
  [
    ['a', 'x'],
    ['b', 'y'],
    ['c', 'z'],
  ],
  (a, b) => a + b
);
// 返回: ['abc', 'xyz']

// 查找最大值
unzipWith(
  [
    [1, 10],
    [2, 20],
    [3, 5],
  ],
  Math.max
);
// 返回: [3, 20]
```

`null`、`undefined` 或空数组被视为空数组。

```typescript
import { unzipWith } from 'es-toolkit/compat';

unzipWith(null, (a, b) => a + b); // []
unzipWith(undefined, (a, b) => a + b); // []
unzipWith([], (a, b) => a + b); // []
```

#### 参数

- `array` (`ArrayLike<ArrayLike<T>> | null | undefined`): 要解压的嵌套数组。
- `iteratee` (`(...values: T[]) => R`, 可选): 要应用于每组元素的转换函数。如果未提供,执行默认的 `unzip` 操作。

#### 返回值

(`R[]` 或 `T[][]`): 如果提供了转换函数则返回转换结果数组,否则返回解压数组。
