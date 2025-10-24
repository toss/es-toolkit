# drop (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `drop`

此 `drop` 函数由于处理 `null` 或 `undefined`、`toInteger` 转换等原因而表现复杂。

请改用更快、更现代的 `es-toolkit` 的 [`drop`](../../array/drop.md)。

:::

从数组的开头删除指定数量的元素。

```typescript
const result = drop(array, n);
```

## 参考

### `drop(array, n?)`

当您想从数组的开头删除几个元素并获取其余元素时,使用 `drop`。默认情况下,它会删除第一个元素。

```typescript
import { drop } from 'es-toolkit/compat';

// 基本用法(删除第一个元素)
drop([1, 2, 3, 4, 5]);
// 返回: [2, 3, 4, 5]

// 删除前 2 个元素
drop([1, 2, 3, 4, 5], 2);
// 返回: [3, 4, 5]

// 删除前 3 个元素
drop(['a', 'b', 'c', 'd'], 3);
// 返回: ['d']
```

指定 0 或负数时,返回原始数组。

```typescript
import { drop } from 'es-toolkit/compat';

// 删除 0 个元素
drop([1, 2, 3], 0);
// 返回: [1, 2, 3]

// 指定负数
drop([1, 2, 3], -1);
// 返回: [1, 2, 3]
```

指定大于数组的数字时,返回空数组。

```typescript
import { drop } from 'es-toolkit/compat';

// 指定大于数组大小的数字
drop([1, 2, 3], 5);
// 返回: []

// 从空数组中删除
drop([], 1);
// 返回: []
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { drop } from 'es-toolkit/compat';

drop(null, 1);
// 返回: []

drop(undefined, 2);
// 返回: []
```

也支持类数组对象。

```typescript
import { drop } from 'es-toolkit/compat';

// 类数组对象
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
drop(arrayLike, 1);
// 返回: ['b', 'c']
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要删除元素的数组。
- `n` (`number`, 可选): 要删除的元素数量。默认为 `1`。

#### 返回值

(`T[]`): 返回从开头删除指定数量元素的新数组。
