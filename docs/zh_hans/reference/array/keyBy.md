# keyBy

使用键生成函数将数组元素转换为键值对对象,返回一个新对象。

```typescript
const result = keyBy(arr, getKeyFromItem);
```

## 参考

### `keyBy(arr, getKeyFromItem)`

当您想创建一个以键索引的对象以便快速查找数组的每个元素时,请使用 `keyBy`。提供一个从每个元素生成唯一键的函数,即可创建一个可以用该键访问元素的对象。如果有多个元素生成相同的键,则使用最后一个元素。

```typescript
import { keyBy } from 'es-toolkit/array';

// 使用对象的 id 属性作为键
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' }
];
keyBy(users, user => user.id);
// Returns: {
//   1: { id: 1, name: 'john' },
//   2: { id: 2, name: 'jane' },
//   3: { id: 3, name: 'bob' }
// }

// 使用字符串属性作为键
const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
];
keyBy(products, item => item.category);
// Returns: {
//   fruit: { category: 'fruit', name: 'banana' }, // 最后一个 fruit 元素
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```

也可以使用复杂的键生成逻辑。

```typescript
import { keyBy } from 'es-toolkit/array';

// 组合多个属性创建键
const orders = [
  { date: '2023-01-01', customerId: 1, amount: 100 },
  { date: '2023-01-01', customerId: 2, amount: 200 },
  { date: '2023-01-02', customerId: 1, amount: 150 }
];
keyBy(orders, order => `${order.date}-${order.customerId}`);
// Returns: {
//   '2023-01-01-1': { date: '2023-01-01', customerId: 1, amount: 100 },
//   '2023-01-01-2': { date: '2023-01-01', customerId: 2, amount: 200 },
//   '2023-01-02-1': { date: '2023-01-02', customerId: 1, amount: 150 }
// }
```

#### 参数

- `arr` (`readonly T[]`): 要转换为对象的数组。
- `getKeyFromItem` (`(item: T) => K`): 从每个元素生成键的函数。

#### 返回值

(`Record<K, T>`): 返回一个对象,以生成的键作为属性名,对应元素作为值。如果有多个元素生成相同的键,则最后一个元素将作为值使用。
