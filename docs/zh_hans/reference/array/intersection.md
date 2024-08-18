# intersection

返回两个数组的交集。

该函数接受两个数组并返回一个新数组，该数组包含同时存在于两个数组中的元素。

它有效地过滤掉第一个数组中不在第二个数组中的元素。

## 签名

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### 参数

- `firstArr` (`T[]`): 要比较的第一个数组。
- `secondArr` (`T[]`): 要比较的第二个数组。

### 返回值

(`T[]`) 包含同时存在于两个数组中的元素的新数组。

## 示例

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 结果将是 [3, 4, 5] 因为这些元素在两个数组中都存在。
```
