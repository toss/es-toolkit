# intersectionBy

根据映射函数返回两个或多个数组的交集。

```typescript
const result = intersectionBy(firstArr, secondArr, ...otherArr, mapper);
```

## 用法

### `intersectionBy(firstArr, secondArr, ...otherArr?, mapper)`

当您想要根据特定属性或转换后的值在两个或多个数组中查找公共元素时,请使用 `intersectionBy`。它通过比较对每个元素应用转换函数的结果来计算交集。这在按特定属性比较对象数组或需要复杂转换逻辑时非常有用。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 根据对象的 id 属性求交集
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 4, name: 'alice' },
];
intersectionBy(users1, users2, user => user.id);
// Returns: [{ id: 2, name: 'jane' }]

// 也可以比较不同类型的数组
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3, 4];
intersectionBy(objects, ids, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 2, name: 'banana' }]
```

也可以应用复杂的转换逻辑。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 转换为小写后比较字符串
const words1 = ['Apple', 'Banana', 'Cherry'];
const words2 = ['apple', 'DATE', 'elderberry'];
intersectionBy(words1, words2, word => word.toLowerCase());
// Returns: ['Apple']

// 转换为绝对值后比较数字
const numbers1 = [1, -2, 3, -4];
const numbers2 = [2, -3, 4, 5];
intersectionBy(numbers1, numbers2, num => Math.abs(num));
// Returns: [-2, 3, -4]
```

您也可以比较三个或更多数组。

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 查找在所有三个数组中都存在的元素
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }];
const arr3 = [{ id: 2 }, { id: 4 }];
intersectionBy(arr1, arr2, arr3, item => item.id);
// Returns: [{ id: 2 }, { id: 3 }]
```

#### 参数

- `firstArr` (`readonly T[]`): 要比较的第一个数组。
- `secondArr` (`readonly U[]`): 要比较的第二个数组。
- `...otherArr` (`readonly U[]`, 可选): 要比较的其他数组。
- `mapper` (`(item: T | U) => unknown`): 转换每个元素以创建比较标准的函数。

#### 返回值

(`T[]`): 返回一个新数组,包含第一个数组中根据转换后的值在所有其他数组中都存在的元素。结果由第一个数组的元素组成。
