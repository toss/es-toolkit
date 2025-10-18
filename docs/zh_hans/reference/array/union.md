# union

创建一个包含两个数组所有唯一元素的新数组。

```typescript
const unified = union(arr1, arr2);
```

## 参考

### `union(arr1, arr2)`

当您想将多个数组的所有元素合并为一个且不重复时,请使用 `union`。它将两个数组合并后,返回一个去除重复值的新数组。

```typescript
import { union } from 'es-toolkit/array';

// 求数字数组的并集。
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
union(array1, array2);
// Returns: [1, 2, 3, 4, 5]

// 求字符串数组的并集。
const fruits1 = ['apple', 'banana'];
const fruits2 = ['banana', 'orange'];
union(fruits1, fruits2);
// Returns: ['apple', 'banana', 'orange']
```

第一个数组的元素先出现,然后添加第二个数组的唯一元素。

```typescript
import { union } from 'es-toolkit/array';

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];
union(arr1, arr2);
// Returns: [1, 2, 3, 4, 5]
// 1, 2, 3来自arr1,4, 5来自arr2。
```

#### 参数

- `arr1` (`T[]`): 要合并的第一个数组。
- `arr2` (`T[]`): 要合并的第二个数组。

#### 返回值

(`T[]`): 返回包含两个数组所有唯一元素的新数组。
