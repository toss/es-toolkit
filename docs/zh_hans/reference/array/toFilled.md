# toFilled

用指定的值填充数组的一部分或全部,创建一个新数组。

```typescript
const filled = toFilled(arr, value, start?, end?);
```

## 用法

### `toFilled(arr, value, start?, end?)`

当您想用指定的值填充数组的特定范围时,请使用 `toFilled`。它不会修改原数组,而是创建并返回一个新数组。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// 从索引2到末尾用'*'填充。
toFilled(array, '*', 2);
// Returns: [1, 2, '*', '*', '*']

// 从索引1到4之前用'*'填充。
toFilled(array, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]
```

如果省略起始和结束位置,则填充整个数组。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

toFilled(array, '*');
// Returns: ['*', '*', '*', '*', '*']
```

也可以使用负索引。从数组末尾开始计算。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// 从倒数第4个到倒数第1个之前用'*'填充。
toFilled(array, '*', -4, -1);
// Returns: [1, '*', '*', '*', 5]
```

#### 参数

- `arr` (`T[]`): 作为基础的原数组。
- `value` (`U`): 用于填充数组的值。
- `start` (`number`, 可选): 填充的起始位置。默认值为 `0`。
- `end` (`number`, 可选): 填充的结束位置。默认值为数组的长度。

#### 返回值

(`Array<T | U>`): 返回指定范围已用值填充的新数组。原数组不会被修改。
