# groupBy

根据键生成函数将数组元素分组,返回一个新对象。

```typescript
const grouped = groupBy(arr, getKeyFromItem);
```

## 用法

### `groupBy(arr, getKeyFromItem)`

当您想根据特定标准对数组元素进行分类时,请使用 `groupBy`。提供一个从每个元素生成键的函数,它将具有相同键的元素分组在一起并作为对象返回。返回对象的值是属于每个组的元素数组。在按类别整理数据或进行分组分析时很有用。

```typescript
import { groupBy } from 'es-toolkit/array';

// 按类别对对象数组进行分组
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

const result = groupBy(items, item => item.category);
// 结果:
// {
//   fruit: [
//     { category: 'fruit', name: 'apple' },
//     { category: 'fruit', name: 'banana' }
//   ],
//   vegetable: [
//     { category: 'vegetable', name: 'carrot' }
//   ]
// }
```

可以按各种标准进行分组。

```typescript
import { groupBy } from 'es-toolkit/array';

// 按字符串长度分组
const words = ['one', 'two', 'three', 'four', 'five'];
const byLength = groupBy(words, word => word.length);
// 结果: { 3: ['one', 'two'], 4: ['four', 'five'], 5: ['three'] }

// 按奇数/偶数分组
const numbers = [1, 2, 3, 4, 5, 6];
const byParity = groupBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 结果: { odd: [1, 3, 5], even: [2, 4, 6] }
```

#### 参数

- `arr` (`T[]`): 要分组的数组。
- `getKeyFromItem` (`(item: T) => K`): 从每个元素生成键的函数。

#### 返回值

(`Record<K, T[]>`): 返回按键分组元素的对象。
