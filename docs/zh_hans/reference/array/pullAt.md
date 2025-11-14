# pullAt

从数组中移除指定索引的元素,并返回被移除的元素。

```typescript
const removed = pullAt(arr, indices);
```

## 用法

### `pullAt(arr, indicesToRemove)`

当您想移除数组特定位置的元素时,请使用 `pullAt`。此函数修改原数组,并将被移除的元素作为新数组返回。也支持负数索引,从数组末尾开始计算。

```typescript
import { pullAt } from 'es-toolkit/array';

// 一次移除多个索引的元素
const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]

// 即使有重复的索引也能安全处理
const fruits = ['apple', 'banana', 'cherry', 'date'];
const removedFruits = pullAt(fruits, [1, 2, 1]);
console.log(removedFruits); // ['banana', 'cherry', 'banana']
console.log(fruits); // ['apple', 'date']
```

如果指定了不存在的索引,该位置将返回 `undefined`。

```typescript
import { pullAt } from 'es-toolkit/array';

const items = [1, 2, 3];
const removed = pullAt(items, [0, 5, 2]);
console.log(removed); // [1, undefined, 3]
console.log(items); // [2]
```

#### 参数

- `arr` (`T[]`): 要移除元素的数组。
- `indicesToRemove` (`number[]`): 要移除的元素的索引数组。负数索引从数组末尾开始计算。

#### 返回值

(`T[]`): 由被移除的元素组成的新数组。对于不存在的索引包含 `undefined`。
