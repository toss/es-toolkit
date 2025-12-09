# sortBy

根据给定的标准对数组进行升序排序,返回一个新数组。
```typescript
const sorted = sortBy(arr, criteria);
```

## 用法

### `sortBy(arr, criteria)`

当您想根据多个属性或计算值对数组进行排序时,请使用 `sortBy`。提供属性名或转换函数的数组,会按照该顺序设置优先级并进行升序排序。在对表格数据排序或需要复杂排序逻辑时非常有用。
```typescript
import { sortBy } from 'es-toolkit/array';

// 对字符串数组排序
const strings = ['banana', 'apple', 'cherry'];
sortBy(strings);
// Returns: ['apple', 'banana', 'cherry']

// 按字符串长度排序
const strings = ['banana', 'a', 'cherry'];
sortBy(strings, [x => x.length]);
// Returns: ['a', 'cherry', 'banana']

// 不区分大小写排序
const strings = ['Banana', 'apple', 'Cherry'];
sortBy(strings, [x => x.toLowerCase()]);
// Returns: ['apple', 'Banana', 'Cherry']

// 对数字数组排序
const numbers = [3, 1, 4, 1, 5, 9];
sortBy(numbers);
// Returns: [1, 1, 3, 4, 5, 9]

// 按单个属性排序
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 35 },
];
const byAge = sortBy(users, ['age']);
// Returns: [{ name: 'jane', age: 25 }, { name: 'john', age: 30 }, { name: 'bob', age: 35 }]

// 按多个属性排序
const employees = [
  { name: 'john', department: 'engineering', age: 30 },
  { name: 'jane', department: 'hr', age: 25 },
  { name: 'bob', department: 'engineering', age: 35 },
  { name: 'alice', department: 'engineering', age: 25 },
];
const sorted = sortBy(employees, ['department', 'age']);
// Returns: 先按部门排序,然后按年龄排序
// [
//   { name: 'alice', department: 'engineering', age: 25 },
//   { name: 'john', department: 'engineering', age: 30 },
//   { name: 'bob', department: 'engineering', age: 35 },
//   { name: 'jane', department: 'hr', age: 25 }
// ]
```

可以使用函数创建复杂的排序标准。
```typescript
import { sortBy } from 'es-toolkit/array';

// 混合使用函数和属性
const products = [
  { name: 'laptop', price: 1000, category: 'electronics' },
  { name: 'shirt', price: 50, category: 'clothing' },
  { name: 'phone', price: 800, category: 'electronics' },
];

const sorted = sortBy(products, [
  'category',
  item => -item.price, // 价格按降序排序(负数转换)
]);
// Returns: 先按类别排序,然后按价格从高到低排序

// 按计算值排序
const words = ['hello', 'a', 'wonderful', 'world'];
const byLength = sortBy(words, [word => word.length]);
// Returns: ['a', 'hello', 'world', 'wonderful']
```

#### 参数

- `arr` (`readonly T[]`): 要排序的数组。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`, 可选): 排序标准。可以是对象属性名或转换函数的数组,前面的标准优先级更高。如果未提供或为空数组,则按原始类型的值本身排序。

#### 返回值

(`T[]`): 返回根据指定标准按升序排序的新数组。