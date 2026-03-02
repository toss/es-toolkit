# fill (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `fill`

此 `fill` 函数由于处理 `null` 或 `undefined`、支持类数组对象等原因而表现复杂。

请改用更快、更现代的 `es-toolkit` 的 [`fill`](../../array/fill.md)。

:::

用指定的值填充数组的元素。

```typescript
const result = fill(array, value, start, end);
```

## 用法

### `fill(array, value, start?, end?)`

当您想用相同的值填充数组的特定范围或整个数组时,使用 `fill`。它会直接修改原始数组。

```typescript
import { fill } from 'es-toolkit/compat';

// 填充整个数组
const arr1 = [1, 2, 3];
fill(arr1, 'a');
// 返回: ['a', 'a', 'a']

// 填充特定范围
const arr2 = [1, 2, 3, 4, 5];
fill(arr2, '*', 1, 4);
// 返回: [1, '*', '*', '*', 5]

// 使用负数索引
const arr3 = [1, 2, 3, 4, 5];
fill(arr3, 'x', -3, -1);
// 返回: [1, 2, 'x', 'x', 5]
```

也支持类数组对象。

```typescript
import { fill } from 'es-toolkit/compat';

const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
fill(arrayLike, 'a', 1, 2);
// 返回: { 0: 1, 1: 'a', 2: 3, length: 3 }
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { fill } from 'es-toolkit/compat';

fill(null, 'a');
// 返回: []

fill(undefined, 'a');
// 返回: []
```

字符串是只读的,因此按原样返回。

```typescript
import { fill } from 'es-toolkit/compat';

fill('abc', 'x');
// 返回: 'abc' (未修改)
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要填充的数组。
- `value` (`U`): 用于填充数组的值。
- `start` (`number`, 可选): 起始位置。默认为 `0`。
- `end` (`number`, 可选): 结束位置(不包括)。默认为 `array.length`。

#### 返回值

(`ArrayLike<T | U>`): 返回用值填充的数组。
