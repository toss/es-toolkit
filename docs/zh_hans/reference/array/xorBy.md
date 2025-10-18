# xorBy

根据给定函数转换每个元素后的值,创建一个只包含两个数组中的一个数组中存在的元素的新数组。

```typescript
const result = xorBy(arr1, arr2, mapper);
```

## 参考

### `xorBy(arr1, arr2, mapper)`

当您想根据特定标准比较两个数组的元素并求对称差集时,请使用 `xorBy`。用映射函数转换每个元素后,创建一个只存在于两个数组之一的元素的新数组。

```typescript
import { xorBy } from 'es-toolkit/array';

// 根据对象的id求对称差集。
xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], obj => obj.id);
// Returns: [{ id: 1 }, { id: 3 }]

// 根据字符串长度求对称差集。
xorBy(['apple', 'banana'], ['grape', 'cherry', 'apple'], str => str.length);
// Returns: [] (所有长度都重复)
```

映射函数结果相同的元素被视为一个。

```typescript
import { xorBy } from 'es-toolkit/array';

// 映射函数结果相同的元素被视为一个。
xorBy([1, 2, 3, 4], [3, 4, 5, 6], n => n % 3);
// Returns: [] (所有余数都重复)
```

#### 参数

- `arr1` (`readonly T[]`): 要比较的第一个数组。
- `arr2` (`readonly T[]`): 要比较的第二个数组。
- `mapper` (`(item: T) => U`): 将每个元素转换为可比较值的函数。

#### 返回值

(`T[]`): 返回根据映射函数的结果计算的对称差集的新数组。
