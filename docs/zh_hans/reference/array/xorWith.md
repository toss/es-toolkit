# xorWith

使用自定义相等性函数计算两个数组之间的对称差异。

对称差异是指在任一数组中存在，但不在它们的交集中的元素集合，根据自定义的相等性函数进行比较。

## 签名

```typescript
function xorWith<T>(arr1: T[], arr2: T[], areElementsEqual: (item1: T, item2: T) => boolean): T[];
```

### 参数

- `arr1` (`T[]`): 第一个数组。
- `arr2` (`T[]`): 第二个数组。
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): 自定义的相等性函数，用于比较元素。

### 返回值

(`T[]`): 包含在 `arr1` 或 `arr2` 中存在但不同时存在于两者中的元素的数组，基于自定义的相等性函数。

## 示例

```typescript
// 返回 [{ id: 1 }, { id: 3 }]
xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id);
```
