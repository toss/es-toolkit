# initial

返回一个由除最后一个元素外的所有元素组成的新数组。

```typescript
const result = initial(arr);
```

## 用法

### `initial(arr)`

当您想获取除最后一个元素外的所有元素时,请使用 `initial`。如果数组为空或只有一个元素,则返回空数组。在需要排除数组末尾进行处理时很有用。

```typescript
import { initial } from 'es-toolkit/array';

// 从数字数组中排除最后一个元素
const numbers = [1, 2, 3, 4, 5];
initial(numbers);
// Returns: [1, 2, 3, 4]

// 从字符串数组中排除最后一个元素
const strings = ['a', 'b', 'c'];
initial(strings);
// Returns: ['a', 'b']

// 只有一个元素的数组返回空数组
const single = [42];
initial(single);
// Returns: []
```

空数组或特殊情况也能安全处理。

```typescript
import { initial } from 'es-toolkit/array';

// 空数组返回空数组
const empty: number[] = [];
initial(empty);
// Returns: []

// 也可以处理嵌套数组
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
initial(nested);
// Returns: [[1, 2], [3, 4]]
```

#### 参数

- `arr` (`readonly T[]`): 要排除最后一个元素的数组。

#### 返回值

(`T[]`): 返回排除最后一个元素的新数组。如果输入数组为空或只有一个元素,则返回空数组。
