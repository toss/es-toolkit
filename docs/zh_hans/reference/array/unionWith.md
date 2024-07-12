# unionWith

根据自定义相等性函数，从两个给定的数组创建一个唯一值数组。

此函数接受两个数组和一个自定义相等性函数，合并这两个数组，并返回一个新数组，该数组仅包含根据自定义相等性函数确定的唯一值。

## 签名

```typescript
function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### 参数

- `arr1` (`T[]`): 第一个数组，用于合并和筛选唯一值。
- `arr2` (`T[]`): 第二个数组，用于合并和筛选唯一值。
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): 自定义函数，用于确定两个元素是否相等。它接受两个参数，如果元素被视为相等则返回 `true`，否则返回 `false`。

### 返回值

(`T[]`): 基于自定义相等性函数的新唯一值数组。

## 示例

```typescript
const array1 = [{ id: 1 }, { id: 2 }];
const array2 = [{ id: 2 }, { id: 3 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = unionWith(array1, array2, areItemsEqual);
// result 将是 [{ id: 1 }, { id: 2 }, { id: 3 }] 因为 { id: 2 } 在两个数组中被视为相等
```
