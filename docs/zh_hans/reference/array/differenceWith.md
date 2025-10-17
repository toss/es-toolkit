# differenceWith

使用自定义比较函数求两个数组的差集,返回一个新数组。

```typescript
const result = differenceWith(firstArr, secondArr, areItemsEqual);
```

## 参考

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
  { name: 'Charlie', age: 35 }
];
const users2 = [
  { name: 'Alice', age: 31 }, // 即使年龄不同,名字相同就是同一个用户
  { name: 'David', age: 25 }
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

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `differenceWith` 时,与 lodash 完全兼容。

- `differenceWith` 可以接受多个数组与第一个数组进行比较。
- `differenceWith` 可以接受类数组对象作为参数。
- `differenceWith` 可以省略自定义比较函数。省略时,默认使用 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 算法。

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 示例 1: 与多个数组比较并使用比较函数的情况
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// 结果为 [{ id: 1 }]。根据比较标准,此元素只存在于第一个数组中。

// 示例 2: 接受类数组对象作为参数并使用比较函数的情况
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// 结果为 [{ id: 1 }]。根据比较标准,此元素只存在于第一个类数组对象中。

// 示例 3: 省略自定义比较函数
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// 结果为 [1]。此元素在所有数组中唯一存在。
```
