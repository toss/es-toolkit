# fill

用指定的值填充数组的元素。直接修改原数组。

```typescript
const filled = fill(arr, value, start, end);
```

::: info 如果不想修改原数组,请使用 [`toFilled`](./toFilled.md)。

`toFilled` 返回一个新数组,而不是修改原数组。

:::

## 参考

### `fill(arr, value, start?, end?)`

当您想用指定的值填充数组的特定范围时,请使用 `fill`。从开始位置到结束位置之前的元素将被替换为提供的值。如果不指定开始或结束位置,将填充整个数组。

```typescript
import { fill } from 'es-toolkit/array';

// 用 'a' 填充整个数组
const array1 = [1, 2, 3];
fill(array1, 'a');
// Returns: ['a', 'a', 'a']

// 用 2 填充空数组
const array2 = Array(3);
fill(array2, 2);
// Returns: [2, 2, 2]

// 用 '*' 填充索引 1 到 3 之前的位置
const array3 = [4, 6, 8, 10];
fill(array3, '*', 1, 3);
// Returns: [4, '*', '*', 10]
```

也可以使用负数索引。负数索引从数组末尾开始计算。

```typescript
import { fill } from 'es-toolkit/array';

const array = [1, 2, 3];
fill(array, '*', -2, -1);
// Returns: [1, '*', 3]
```

#### 参数

- `arr` (`Array<T | U>`): 要填充的数组。
- `value` (`U`): 用于填充数组的值。
- `start` (`number`, 可选): 开始位置。默认值为 `0`。
- `end` (`number`, 可选): 结束位置。默认值为数组的长度。

#### 返回值

(`Array<T | U>`): 返回用值填充的原数组。
