# uniqBy

根据转换函数返回的值,返回去除数组中重复元素后的新数组。

```typescript
const uniqueArray = uniqBy(arr, mapper);
```

## 用法

### `uniqBy(arr, mapper)`

当您想根据特定标准转换数组元素来判断重复时,请使用 `uniqBy`。对于转换函数返回相同值的元素,只保留首次出现的元素。

```typescript
import { uniqBy } from 'es-toolkit/array';

// 将小数向下取整转换后去除重复项。
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// 根据对象数组的特定属性去除重复项。
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// 根据字符串长度去除重复项。
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

对于复杂对象也可以根据特定字段的组合进行去重。

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// 根据类别去除重复项。
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### 参数

- `arr` (`readonly T[]`): 要去除重复项的数组。
- `mapper` (`(item: T) => U`): 将每个元素转换为用于比较的值的函数。

#### 返回值

(`T[]`): 根据转换函数的结果去除重复项后的新数组。保持原数组中首次出现的顺序。
