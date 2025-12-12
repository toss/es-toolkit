# xorWith

使用给定的比较函数,创建一个只包含两个数组中的一个数组中存在的元素的新数组。

```typescript
const result = xorWith(arr1, arr2, areElementsEqual);
```

## 用法

### `xorWith(arr1, arr2, areElementsEqual)`

当您想用复杂对象或特殊比较条件求对称差集时,请使用 `xorWith`。用用户定义的相等函数比较元素,创建一个只存在于两个数组之一的元素的新数组。

```typescript
import { xorWith } from 'es-toolkit/array';

// 根据对象的id进行比较。
xorWith(
  [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  [
    { id: 2, name: 'Bobby' },
    { id: 3, name: 'Charlie' },
  ],
  (a, b) => a.id === b.id
);
// Returns: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// 忽略大小写进行比较。
xorWith(['Apple', 'Banana'], ['APPLE', 'Cherry'], (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Banana', 'Cherry']
```

也可以进行更复杂的比较。

```typescript
import { xorWith } from 'es-toolkit/array';

// 根据绝对值进行比较。
xorWith([-1, -2, 3], [1, 2, -4], (a, b) => Math.abs(a) === Math.abs(b));
// Returns: [3, -4]

// 进行深层对象比较。
xorWith(
  [{ specs: { ram: 8, storage: 256 } }],
  [{ specs: { ram: 8, storage: 256 } }],
  (a, b) => a.specs.ram === b.specs.ram && a.specs.storage === b.specs.storage
);
// Returns: []
```

#### 参数

- `arr1` (`readonly T[]`): 要比较的第一个数组。
- `arr2` (`readonly T[]`): 要比较的第二个数组。
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 判断两个元素是否相同的函数。如果相同应返回 `true`,否则返回 `false`。

#### 返回值

(`T[]`): 返回根据自定义相等函数计算的对称差集的新数组。
