# intersectionBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [intersectionBy](../../array/intersectionBy.md)

此 `intersectionBy` 函数由于复杂的条件处理、多数组支持、属性路径解析等原因运行缓慢。

请使用更快、更现代的 `es-toolkit` 的 [intersectionBy](../../array/intersectionBy.md)。

:::

使用给定的条件函数查找多个数组的交集。

```typescript
const result = intersectionBy(...arrays, iteratee);
```

## 用法

### `intersectionBy(...arrays, iteratee)`

根据给定条件函数转换后的值，查找多个数组的交集。条件可以以各种形式提供，如函数、属性名、部分对象等。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

// 按函数查找交集
const array1 = [2.1, 1.2];
const array2 = [2.3, 3.4];
const result = intersectionBy(array1, array2, Math.floor);
// result 为 [2.1]（基于 Math.floor，2 是共同的）

// 按属性查找交集
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const byId = intersectionBy(users1, users2, 'id');
// byId 为 [{ id: 2, name: 'jane' }]

// 三个数组的交集
const array3 = [2.5, 4.1];
const multiResult = intersectionBy(array1, array2, array3, Math.floor);
// multiResult 为 [2.1]

// 类数组对象
const arrayLike1 = { 0: { x: 1 }, 1: { x: 2 }, length: 2 };
const arrayLike2 = { 0: { x: 2 }, 1: { x: 3 }, length: 2 };
const byProperty = intersectionBy(arrayLike1, arrayLike2, 'x');
// byProperty 为 [{ x: 2 }]
```

`null` 或 `undefined` 数组被视为空数组。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [{ x: 1 }, { x: 2 }];
const result = intersectionBy(array1, null, 'x');
// result 为 []
```

也可以使用部分对象或属性-值对指定条件。

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const products1 = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
];
const products2 = [
  { category: 'fruit', name: 'banana' },
  { category: 'meat', name: 'beef' },
];

// 使用部分对象指定条件
const byCategory = intersectionBy(products1, products2, { category: 'fruit' });
// 使用属性-值对指定条件
const byCategoryPair = intersectionBy(products1, products2, ['category', 'fruit']);
```

#### 参数

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): 要查找交集的数组。
- `iteratee` (`Function | PropertyKey | Array | Object`): 转换每个元素的条件。可以是函数、属性名、属性-值对或部分对象。

#### 返回值

(`T[]`): 返回基于转换值在所有数组中都存在的元素的新数组。
