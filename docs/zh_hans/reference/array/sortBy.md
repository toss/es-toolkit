# sortBy

根据给定的标准对对象数组进行升序排序,返回一个新数组。

```typescript
const sorted = sortBy(arr, criteria);
```

## 参考

### `sortBy(arr, criteria)`

当您想根据多个属性或计算值对对象数组进行排序时,请使用 `sortBy`。提供属性名或转换函数的数组,会按照该顺序设置优先级并进行升序排序。在对表格数据排序或需要复杂排序逻辑时非常有用。

```typescript
import { sortBy } from 'es-toolkit/array';

// 按单个属性排序
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 35 }
];
const byAge = sortBy(users, ['age']);
// Returns: [{ name: 'jane', age: 25 }, { name: 'john', age: 30 }, { name: 'bob', age: 35 }]

// 按多个属性排序
const employees = [
  { name: 'john', department: 'engineering', age: 30 },
  { name: 'jane', department: 'hr', age: 25 },
  { name: 'bob', department: 'engineering', age: 35 },
  { name: 'alice', department: 'engineering', age: 25 }
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
  { name: 'phone', price: 800, category: 'electronics' }
];

const sorted = sortBy(products, [
  'category',
  item => -item.price // 价格按降序排序
]);
// Returns: 先按类别排序,然后按价格从高到低排序

// 按计算值排序
const words = ['hello', 'a', 'wonderful', 'world'];
const byLength = sortBy(words.map(word => ({ word, length: word.length })), ['length']);
// Returns: 按字符串长度排序的对象数组
```

#### 参数

- `arr` (`readonly T[]`): 要排序的对象数组。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 排序标准。可以是对象属性名或转换函数的数组,前面的标准优先级更高。

#### 返回值

(`T[]`): 返回根据指定标准按升序排序的新数组。
