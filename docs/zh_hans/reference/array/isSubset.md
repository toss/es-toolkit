# isSubset

检查 `subset` 数组是否完全包含在 `superset` 数组中。

## 签名

```typescript
function isSubset<T>(superset: T[], subset: T[]): boolean;
```

### 参数

- `superset` (`T[]`): 可能包含子集所有元素的数组。
- `subset` (`T[]`): 要与超集进行检查的数组。

### 返回值

(`boolean`): 如果 `subset` 中的所有元素都存在于 `superset` 中，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const superset1 = [1, 2, 3, 4, 5];
const subset1 = [2, 3, 4];

isSubset(superset1, subset1);
// 返回 true

const superset2 = ['a', 'b', 'c'];
const subset2 = ['a', 'd'];

isSubset(superset2, subset2);
// 返回 false
```
