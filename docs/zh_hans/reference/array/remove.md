# remove

根据条件函数从数组中移除元素,并将被移除的元素作为新数组返回。此函数会直接修改原数组。

```typescript
const removed = remove(arr, shouldRemoveElement);
```

## 用法

### `remove(arr, shouldRemoveElement)`

当您想从数组中移除满足特定条件的元素并查看被移除的元素时,请使用 `remove`。此函数在修改原数组的同时,将被移除的元素作为单独的数组返回。如果想保持原数组不变,请使用 `filter` 方法。

```typescript
import { remove } from 'es-toolkit/array';

// 移除偶数
const numbers = [1, 2, 3, 4, 5];
const removedNumbers = remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5] (原数组被修改)
console.log(removedNumbers); // [2, 4] (被移除的元素)

// 移除满足特定条件的对象
const users = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 17 },
  { name: 'bob', age: 30 },
];
const minors = remove(users, user => user.age < 18);
console.log(users); // [{ name: 'john', age: 25 }, { name: 'bob', age: 30 }]
console.log(minors); // [{ name: 'jane', age: 17 }]
```

也可以使用索引和原数组信息。

```typescript
import { remove } from 'es-toolkit/array';

// 基于索引移除元素
const items = ['a', 'b', 'c', 'd', 'e'];
const removedAtEvenIndex = remove(items, (value, index) => index % 2 === 0);
console.log(items); // ['b', 'd']
console.log(removedAtEvenIndex); // ['a', 'c', 'e']
```

#### 参数

- `arr` (`T[]`): 要修改的数组。
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 对每个元素调用的条件函数。返回 `true` 时该元素会被移除。
  - `value`: 当前正在处理的元素。
  - `index`: 当前元素的索引。
  - `array`: 原数组。

#### 返回值

(`T[]`): 返回由被移除元素组成的新数组。
