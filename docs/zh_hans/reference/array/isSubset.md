# isSubset

检查一个数组是否是另一个数组的子集。

```typescript
const result = isSubset(superset, subset);
```

## 参考

### `isSubset(superset, subset)`

当您想确认一个数组的所有元素是否都包含在另一个数组中时,请使用 `isSubset`。在确认子集关系或检查权限、功能、标签等是否在允许范围内时很有用。

```typescript
import { isSubset } from 'es-toolkit/array';

// 检查数字数组的子集
const numbers = [1, 2, 3, 4, 5];
const subset = [2, 3, 4];
isSubset(numbers, subset);
// Returns: true

// 检查字符串数组的子集
const permissions = ['read', 'write', 'delete', 'admin'];
const userPermissions = ['read', 'write'];
isSubset(permissions, userPermissions);
// Returns: true

// 不是子集的情况
const colors = ['red', 'blue', 'green'];
const invalidColors = ['red', 'yellow'];
isSubset(colors, invalidColors);
// Returns: false
```

特殊情况也能正确处理。

```typescript
import { isSubset } from 'es-toolkit/array';

// 空数组始终是子集
const anyArray = [1, 2, 3];
const emptyArray: number[] = [];
isSubset(anyArray, emptyArray);
// Returns: true

// 相同的数组是自己的子集
const same = ['a', 'b', 'c'];
isSubset(same, same);
// Returns: true

// 即使有重复元素也能正常工作
const withDuplicates = [1, 2, 2, 3];
const duplicateSubset = [2, 2];
isSubset(withDuplicates, duplicateSubset);
// Returns: true
```

#### 参数

- `superset` (`readonly T[]`): 可以包含子集所有元素的超集数组。
- `subset` (`readonly T[]`): 要确认是否包含在超集中的子集数组。

#### 返回值

(`boolean`): 如果子集的所有元素都包含在超集中,则返回 `true`,否则返回 `false`。
