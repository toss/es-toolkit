# union

从所有给定的数组中创建一个包含唯一值的数组。

此函数接受两个数组，将它们合并为一个数组，并返回一个新数组，其中包含合并后数组中的唯一值。

## 签名

```typescript
function union<T>(arr1: T[], arr2: T[]): T[];
```

### 参数

- `arr1` (`T[]`): 第一个数组，用于合并和筛选唯一值。
- `arr2` (`T[]`): 第二个数组，用于合并和筛选唯一值。

### 返回值

(`T[]`): 包含唯一值的新数组。

## 示例

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// result 将会是 [1, 2, 3, 4, 5]
```
