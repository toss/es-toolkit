# xor

创建一个只包含两个数组中的一个数组中存在的元素的新数组。

```typescript
const result = xor(arr1, arr2);
```

## 参考

### `xor(arr1, arr2)`

当您想求两个数组的对称差集时,请使用 `xor`。返回一个由只存在于两个数组之一且不在交集中的元素组成的新数组。

```typescript
import { xor } from 'es-toolkit/array';

// 求数字数组的对称差集。
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// 求字符串数组的对称差集。
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']
```

重复元素会自动删除。

```typescript
import { xor } from 'es-toolkit/array';

xor([1, 2, 2, 3], [3, 4, 4, 5]);
// Returns: [1, 2, 4, 5]
```

#### 参数

- `arr1` (`readonly T[]`): 要比较的第一个数组。
- `arr2` (`readonly T[]`): 要比较的第二个数组。

#### 返回值

(`T[]`): 返回表示两个数组对称差集的新数组。
