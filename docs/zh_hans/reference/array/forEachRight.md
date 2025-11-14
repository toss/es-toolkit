# forEachRight

从右到左遍历数组元素,对每个元素执行函数。

```typescript
forEachRight(arr, callback);
```

## 用法

### `forEachRight(arr, callback)`

当您想逆序遍历数组并对每个元素执行操作时,请使用 `forEachRight`。它从数组的最后一个元素到第一个元素依次调用回调函数。在需要逆序处理或从数组末尾开始工作时很有用。

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// 使用 forEachRight 函数逆序遍历数组
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // [3, 2, 1]
```

回调函数接收三个参数。

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = ['a', 'b', 'c'];
forEachRight(array, (value, index, arr) => {
  console.log(`值: ${value}, 索引: ${index}, 数组:`, arr);
});
// 输出:
// 值: c, 索引: 2, 数组: ['a', 'b', 'c']
// 值: b, 索引: 1, 数组: ['a', 'b', 'c']
// 值: a, 索引: 0, 数组: ['a', 'b', 'c']
```

#### 参数

- `arr` (`T[]`): 要遍历的数组。
- `callback` (`(value: T, index: number, arr: T[]) => void`): 对每个元素执行的函数。
  - `value`: 当前正在处理的数组元素。
  - `index`: 当前正在处理的元素的索引。
  - `arr`: 调用 `forEachRight` 函数的数组。
