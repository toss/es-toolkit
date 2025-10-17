# unionBy

根据特定函数转换后的值,创建一个包含两个数组唯一元素的新数组。

```typescript
const unified = unionBy(arr1, arr2, mapper);
```

## 参考

### `unionBy(arr1, arr2, mapper)`

当您想根据特定属性从对象数组中去除重复项时,请使用 `unionBy`。如果 `mapper` 函数返回的值相同,则将其视为相同元素。

```typescript
import { unionBy } from 'es-toolkit/array';

// 根据id求对象的并集。
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
unionBy(users1, users2, user => user.id);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

// 根据数字除以3的余数求并集。
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
unionBy(nums1, nums2, x => x % 3);
// Returns: [1, 2, 3]
// 1 % 3 = 1, 2 % 3 = 2, 3 % 3 = 0,
// 4 % 3 = 1, 5 % 3 = 2, 6 % 3 = 0,所以都重复了。
```

使用自定义比较函数也可以根据复杂标准求并集。

```typescript
import { unionBy } from 'es-toolkit/array';

const products1 = [
  { category: 'electronics', price: 100 },
  { category: 'books', price: 20 },
];
const products2 = [
  { category: 'electronics', price: 150 },
  { category: 'toys', price: 30 },
];

// 根据类别求并集。
unionBy(products1, products2, product => product.category);
// Returns: [
//   { category: 'electronics', price: 100 },
//   { category: 'books', price: 20 },
//   { category: 'toys', price: 30 }
// ]
```

#### 参数

- `arr1` (`T[]`): 要合并的第一个数组。
- `arr2` (`T[]`): 要合并的第二个数组。
- `mapper` (`(item: T) => U`): 将每个元素转换为用于比较的值的函数。

#### 返回值

(`T[]`): 返回根据 `mapper` 函数返回的值去除重复后的两个数组的并集。
