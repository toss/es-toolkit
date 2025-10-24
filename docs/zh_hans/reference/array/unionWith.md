# unionWith

根据自定义相等函数,创建一个包含两个数组唯一元素的新数组。

```typescript
const unified = unionWith(arr1, arr2, areItemsEqual);
```

## 参考

### `unionWith(arr1, arr2, areItemsEqual)`

当您想根据复杂条件判断元素是否相等时,请使用 `unionWith`。如果提供的函数返回真,则将两个元素判断为相同并去除重复。

```typescript
import { unionWith } from 'es-toolkit/array';

// 根据对象的id求并集。
const array1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const array2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
const areItemsEqual = (a, b) => a.id === b.id;
unionWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

也可以使用更复杂的比较逻辑。

```typescript
import { unionWith } from 'es-toolkit/array';

// 根据坐标求并集。
const points1 = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
];
const points2 = [
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
const arePointsEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
unionWith(points1, points2, arePointsEqual);
// Returns: [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }]
```

忽略大小写的字符串比较示例。

```typescript
import { unionWith } from 'es-toolkit/array';

const words1 = ['Apple', 'banana'];
const words2 = ['BANANA', 'orange'];
const areWordsEqual = (a, b) => a.toLowerCase() === b.toLowerCase();
unionWith(words1, words2, areWordsEqual);
// Returns: ['Apple', 'banana', 'orange']
// 'banana'和'BANANA'被判断为相同,因此只保留第一个。
```

#### 参数

- `arr1` (`T[]`): 要合并的第一个数组。
- `arr2` (`T[]`): 要合并的第二个数组。
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 判断两个元素是否相同的函数。如果判断为相同则应返回 `true`,否则返回 `false`。

#### 返回值

(`T[]`): 返回根据自定义相等函数去除重复后的两个数组的并集。
