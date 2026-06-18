# countBy

根据转换函数的结果对数组元素进行分类,并返回一个统计各分类数量的对象。

```typescript
const counted = countBy(arr, mapper);
```

## 用法

### `countBy(arr, mapper)`

当您想按特定标准对数组元素进行分类并统计每组数量时,请使用 `countBy`。使用转换函数返回的值作为键对元素进行分组,并计算每组中的元素数量。

```typescript
import { countBy } from 'es-toolkit/array';

// 将数字分类为奇数/偶数并统计数量。
countBy([1, 2, 3, 4, 5], item => (item % 2 === 0 ? 'even' : 'odd'));
// 返回: { odd: 3, even: 2 }
```

也可以根据对象数组的特定属性进行统计。

```typescript
import { countBy } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
];

countBy(users, user => user.age);
// 返回: { '25': 2, '30': 2 }
```

#### 参数

- `arr` (`T[]`): 要统计元素数量的数组。
- `mapper` (`(item: T, index: number, array: T[]) => K`): 返回用于分类元素的值的函数,会传入每个元素、索引和数组。

#### 返回值

(`Record<K, number>`): 表示每个分类标准下有多少个元素的对象。
