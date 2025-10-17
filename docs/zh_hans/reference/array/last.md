# last

返回数组的最后一个元素。

```typescript
const lastElement = last(arr);
```

## 参考

### `last(arr)`

当您想获取数组的最后一个元素时,请使用 `last`。如果数组为空,则返回 `undefined`。在访问数组末尾的数据时很有用。

```typescript
import { last } from 'es-toolkit/array';

// 获取数字数组的最后一个元素
const numbers = [1, 2, 3, 4, 5];
last(numbers);
// Returns: 5

// 获取字符串数组的最后一个元素
const strings = ['a', 'b', 'c'];
last(strings);
// Returns: 'c'

// 空数组返回 undefined
const emptyArray: number[] = [];
last(emptyArray);
// Returns: undefined
```

类型处理很安全。

```typescript
import { last } from 'es-toolkit/array';

// 非空数组的情况下类型明确
const nonEmptyArray = [1, 2, 3] as const;
last(nonEmptyArray);
// Returns: 3 (类型: 3)

// 普通数组的情况下可能为 undefined
const maybeEmptyArray = [1, 2, 3];
last(maybeEmptyArray);
// Returns: 3 | undefined (类型: number | undefined)
```

在大数组中也能高效工作。

```typescript
import { last } from 'es-toolkit/array';

// 性能已优化
const largeArray = Array(1000000)
  .fill(0)
  .map((_, i) => i);
last(largeArray);
// Returns: 999999 (快速访问)

// 也可以处理嵌套数组
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
last(nested);
// Returns: [5, 6]
```

#### 参数

- `arr` (`readonly T[]`): 要获取最后一个元素的数组。

#### 返回值

(`T | undefined`): 数组的最后一个元素。如果数组为空,则返回 `undefined`。
