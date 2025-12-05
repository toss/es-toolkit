# uniqBy

根据选择器函数或指定属性键返回的值，返回去除数组中重复元素后的新数组。

```typescript
const uniqueArray = uniqBy(arr, selector);
```

## 用法

### `uniqBy(arr, selector)`

当您想根据特定标准判断重复时，请使用 `uniqBy`。对于选择器得出相同值的元素，只保留首次出现的元素。选择器可以是：

- 将元素转换为比较值的函数
- 元素的属性键（如 `'id'`、`'age'`）

```typescript
import { uniqBy } from 'es-toolkit/array';

// 将小数向下取整后去除重复项。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// 使用选择器函数按特定属性去重。
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 也可以直接传入属性键。
const uniqueByAgeKey = uniqBy(users, 'age');
console.log(uniqueByAgeKey);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 根据字符串长度去重。
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

对于复杂对象，也可以根据多个字段的组合来判断重复。

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// 使用选择器函数按类别去重
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]

// 仅用属性键也能实现同样的结果
const uniqueByCategoryKey = uniqBy(products, 'category');
console.log(uniqueByCategoryKey.length); // 2
console.log(uniqueByCategoryKey);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### 参数

- `arr` (`readonly T[]`): 要去除重复项的数组。
- `selector` (`((item: T) => U) | keyof T`):
  - 将元素转换为比较值的函数，或
  - 用于判断唯一性的属性键。

#### 返回值

(`T[]`): 根据选择器结果去除重复项后的新数组。保持原数组中首次出现的顺序。
