# orderBy

根据多个标准和排序方向对数组进行排序,返回一个新数组。

```typescript
const sorted = orderBy(arr, criteria, orders);
```

## 用法

### `orderBy(arr, criteria, orders)`

当您想对数组进行多条件复合排序时,请使用 `orderBy`。可以为每个条件指定升序或降序,如果前面的条件值相同,则按下一个条件排序。

```typescript
import { orderBy } from 'es-toolkit/array';

// 对字符串数组排序
const strings = ['banana', 'apple', 'cherry'];
orderBy(strings, [], ['desc']);
// Returns: ['cherry', 'banana', 'apple']

// 按字符串长度排序
const strings = ['banana', 'a', 'cherry'];
orderBy(strings, [x => x.length], ['asc']);
// Returns: ['a', 'cherry', 'banana']

// 不区分大小写排序
const strings = ['Banana', 'apple', 'Cherry'];
orderBy(strings, [x => x.toLowerCase()], ['asc']);
// Returns: ['apple', 'Banana', 'Cherry']

// 对数字数组排序
const numbers = [3, 1, 4, 1, 5, 9];
orderBy(numbers, [], ['desc']);
// Returns: [9, 5, 4, 3, 1, 1]

// 根据多个标准对用户数组进行排序
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// Returns:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ]

// 可以混合使用属性名和函数
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 2.0 },
];

orderBy(products, ['category', product => product.name.length], ['asc', 'desc']);
// Returns: 先按 category 排序,在相同 category 内按名称长度降序排序
```

如果排序方向的数量少于条件数量,则重复使用最后一个方向。

```typescript
import { orderBy } from 'es-toolkit/array';

const data = [
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 2, c: 2 },
  { a: 2, b: 1, c: 1 },
];

orderBy(data, ['a', 'b', 'c'], ['asc', 'desc']);
// 'a' 升序,'b' 和 'c' 降序排序
```

#### 参数

- `arr` (`readonly T[]`): 要排序的数组。
- `criteria` (`Array<((item: T) => unknown) | keyof T>`, 可选): 排序标准。可以使用对象的属性名或返回值的函数。如果未提供或为空数组,则按原始类型的值本身排序。
- `orders` (`Array<'asc' | 'desc'>`, 可选): 每个标准的排序方向数组。`'asc'` 表示升序,`'desc'` 表示降序。默认为 `['asc']`。

#### 返回值

(`T[]`): 根据指定标准和方向排序的新数组。
