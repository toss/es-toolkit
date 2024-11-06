# isSubsetWith

检查 `subset` 数组是否完全包含在 `superset` 数组中。

此函数接受两个数组和一个比较函数。比较函数用于确定元素是否相等。如果 `subset` 数组中的所有元素都存在于 `superset` 数组中，则此函数返回 `true`，否则返回 `false`。

## 签名

```typescript
function isSubsetWith<T>(superset: T[], subset: T[], areItemsEqual: (x: T, y: T) => boolean): boolean;
```

### 参数

- `superset` (`T[]`): 可能包含子集所有元素的数组。
- `subset` (`T[]`): 要与超集进行检查的数组。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 用于确定两个项是否相等的函数。

### 返回值

(`boolean`): 如果 `subset` 中的所有元素都存在于 `superset` 中，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 2 }, { id: 1 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// 返回 true

const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// 返回 false
```
