# differenceWith

使用自定义比较函数求两个数组的差集,返回一个新数组。

```typescript
const result = differenceWith(firstArr, secondArr, areItemsEqual);
```

## 用法

### `differenceWith(firstArr, secondArr, areItemsEqual)`

当您想使用自定义函数比较两个数组的元素并求差集时,请使用 `differenceWith`。通过比较函数判断两个元素是否相同,返回只在第一个数组中存在的元素。

```typescript
import { differenceWith } from 'es-toolkit/array';

// 根据 id 对对象数组求差集
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
differenceWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1 }, { id: 3 }]
// id 为 2 的元素被判断为相同,所以被排除

// 也可以比较不同类型的数组
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
const areItemsEqual2 = (a, b) => a.id === b;
differenceWith(objects, numbers, areItemsEqual2);
// Returns: [{ id: 1 }, { id: 3 }]
```

可以使用复杂条件比较元素。

```typescript
import { differenceWith } from 'es-toolkit/array';

const users1 = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];
const users2 = [
  { name: 'Alice', age: 31 }, // 即使年龄不同,名字相同就是同一个用户
  { name: 'David', age: 25 },
];

const areUsersEqual = (a, b) => a.name === b.name;
differenceWith(users1, users2, areUsersEqual);
// Returns: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### 参数

- `firstArr` (`T[]`): 作为差集基准的数组。
- `secondArr` (`U[]`): 包含要从第一个数组中排除的元素的数组。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 判断两个元素是否相同的函数。

#### 返回值

(`T[]`): 根据比较函数判断只在第一个数组中存在的元素的新数组。
