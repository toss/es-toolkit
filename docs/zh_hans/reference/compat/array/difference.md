# difference（Lodash 兼容性）

::: warning 使用 `es-toolkit` 的 `difference`

此 `difference` 函数由于处理 `null` 和 `undefined`、多个数组参数处理而变得复杂。

请使用 `es-toolkit` 中更快、更现代的 [difference](../../array/difference.md)。

:::

从第一个数组中排除其他数组的值,求差集。

```typescript
const result = difference(arr, ...values);
```

## 用法

### `difference(arr, ...values)`

当你想要从第一个数组中删除所有包含在其余数组中的值时,使用 `difference`。顺序保持第一个数组的顺序。

```typescript
import { difference } from 'es-toolkit/compat';

// 基本用法
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const array3 = [5, 6];
difference(array1, array2, array3);
// Returns: [1, 3]

// 字符串数组
difference(['a', 'b', 'c'], ['b'], ['c', 'd']);
// Returns: ['a']

// 处理重复值
difference([1, 2, 2, 3], [2]);
// Returns: [1, 3]
```

也可以处理空数组或空差集。

```typescript
import { difference } from 'es-toolkit/compat';

// 与空数组的差集
difference([1, 2, 3], []);
// Returns: [1, 2, 3]

// 所有值都被排除的情况
difference([1, 2, 3], [1, 2, 3]);
// Returns: []

// 没有重叠值的情况
difference([1, 2], [3, 4]);
// Returns: [1, 2]
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { difference } from 'es-toolkit/compat';

difference(null, [1, 2]);
// Returns: []

difference(undefined, [1, 2]);
// Returns: []

difference([1, 2, 3], null, undefined);
// Returns: [1, 2, 3] (null和undefined被忽略)
```

也支持类数组对象。

```typescript
import { difference } from 'es-toolkit/compat';

// 类数组对象
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };
difference(arrayLike1, arrayLike2);
// Returns: [1, 3]
```

#### 参数

- `arr` (`ArrayLike<T> | null | undefined`): 求差集的基准数组。
- `values` (`...ArrayLike<T>[]`): 包含要排除的值的数组。

#### 返回值

(`T[]`): 返回从第一个数组中排除其他数组值的新数组。
