# uniqWith

使用比较函数去除数组中重复元素后,返回一个新数组。

```typescript
const uniqueArray = uniqWith(arr, areItemsEqual);
```

## 参考

### `uniqWith(arr, areItemsEqual)`

当您想根据自定义比较函数判断两个元素是否相等来去除重复时,请使用 `uniqWith`。对于比较函数返回 `true` 的元素,只保留首次出现的元素。

```typescript
import { uniqWith } from 'es-toolkit/array';

// 将差值小于1的数字视为相同来去除重复项。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqWith(numbers, (a, b) => Math.abs(a - b) < 1);
console.log(result); // [1.2, 3.2, 5.7, 7.19]

// 根据特定字段比较对象来去除重复项。
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 25 },
];
const uniqueByAge = uniqWith(users, (a, b) => a.age === b.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'John', age: 30 }, { id: 3, name: 'Bob', age: 25 }]

// 不区分大小写比较字符串来去除重复项。
const words = ['Apple', 'APPLE', 'banana', 'Banana', 'cherry'];
const uniqueCaseInsensitive = uniqWith(words, (a, b) => a.toLowerCase() === b.toLowerCase());
console.log(uniqueCaseInsensitive); // ['Apple', 'banana', 'cherry']
```

也可以进行复杂的对象比较。

```typescript
import { uniqWith } from 'es-toolkit/array';

const products = [
  { name: 'iPhone', brand: 'Apple', price: 1000 },
  { name: 'Galaxy', brand: 'Samsung', price: 900 },
  { name: 'iPhone', brand: 'Apple', price: 1100 }, // 相同的name和brand
  { name: 'Pixel', brand: 'Google', price: 800 },
];

// 当名称和品牌都相同时判断为重复。
const uniqueProducts = uniqWith(products, (a, b) => a.name === b.name && a.brand === b.brand);
console.log(uniqueProducts);
// [
//   { name: 'iPhone', brand: 'Apple', price: 1000 },
//   { name: 'Galaxy', brand: 'Samsung', price: 900 },
//   { name: 'Pixel', brand: 'Google', price: 800 }
// ]
```

#### 参数

- `arr` (`readonly T[]`): 要去除重复项的数组。
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 判断两个元素是否相同的比较函数。如果两个元素相同应返回 `true`,否则返回 `false`。

#### 返回值

(`T[]`): 根据比较函数去除重复项后的新数组。保持原数组中首次出现的顺序。
