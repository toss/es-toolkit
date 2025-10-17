# tail

返回一个新数组,包含除第一个元素外的所有元素。

```typescript
const result = tail(arr);
```

## 参考

### `tail(arr)`

当您想要获取数组中除第一个元素外的所有元素时,请使用 `tail`。如果数组为空或只有一个元素,则返回空数组。这在处理栈或队列中除第一个元素外的其余元素时很有用。

```typescript
import { tail } from 'es-toolkit/array';

// 从数字数组中排除第一个元素。
const numbers = [1, 2, 3, 4, 5];
tail(numbers);
// Returns: [2, 3, 4, 5]

// 从字符串数组中排除第一个元素。
const strings = ['first', 'second', 'third'];
tail(strings);
// Returns: ['second', 'third']

// 只有一个元素的数组返回空数组。
const single = [42];
tail(single);
// Returns: []
```

它可以安全地处理空数组和特殊情况。

```typescript
import { tail } from 'es-toolkit/array';

// 空数组返回空数组。
const empty: number[] = [];
tail(empty);
// Returns: []

// 也可以处理嵌套数组。
const nested = [[1, 2], [3, 4], [5, 6]];
tail(nested);
// Returns: [[3, 4], [5, 6]]

// 也可以处理对象数组。
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
tail(users);
// Returns: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

#### 参数

- `arr` (`readonly T[]`): 要排除第一个元素的数组。

#### 返回值

(`T[]`): 返回排除第一个元素的新数组。如果输入数组为空或只有一个元素,则返回空数组。
