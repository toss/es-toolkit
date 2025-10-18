# intersectionWith

根据自定义比较函数为标准求两个数组的交集,返回一个新数组。

```typescript
const result = intersectionWith(firstArr, secondArr, areItemsEqual);
```

## 参考

### `intersectionWith(firstArr, secondArr, areItemsEqual)`

当您想用自定义的比较函数查找两个数组的共同元素时,请使用 `intersectionWith`。在单纯的值比较难以处理的复杂对象或需要特殊比较逻辑的情况下很有用。

```typescript
import { intersectionWith } from 'es-toolkit/array';

// 按对象的 id 属性比较
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
intersectionWith(users1, users2, (a, b) => a.id === b.id);
// Returns: [{ id: 2, name: 'jane' }]

// 也可以比较不同类型
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3];
intersectionWith(objects, ids, (obj, id) => obj.id === id);
// Returns: [{ id: 2, name: 'banana' }]
```

也可以实现复杂的比较逻辑。

```typescript
import { intersectionWith } from 'es-toolkit/array';

// 不区分大小写的字符串比较
const words1 = ['Apple', 'Banana'];
const words2 = ['apple', 'cherry'];
intersectionWith(words1, words2, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Apple']

// 范围内的数字比较
const numbers1 = [1.1, 2.3, 3.7];
const numbers2 = [1.0, 2.5, 4.0];
intersectionWith(numbers1, numbers2, (a, b) => Math.abs(a - b) < 0.5);
// Returns: [1.1] (1.1 和 1.0 的差小于 0.5)
```

#### 参数

- `firstArr` (`readonly T[]`): 要比较的第一个数组。
- `secondArr` (`readonly U[]`): 要比较的第二个数组。
- `areItemsEqual` (`(x: T, y: U) => boolean`): 判断两个元素是否相同的函数。相同时应返回 `true`,不同时返回 `false`。

#### 返回值

(`T[]`): 返回根据自定义比较函数为标准,由两个数组共同包含的元素组成的新数组。结果由第一个数组的元素组成。
