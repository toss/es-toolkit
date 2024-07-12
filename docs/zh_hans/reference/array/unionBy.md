# unionBy

使用提供的映射函数来确定相等性，从所有给定的数组中创建一个按顺序的唯一值数组。

## 签名

```typescript
function unionBy<T, U>(arr1: T[], arr2: T[], mapper: (item: T) => U): T[];
```

### 参数

- `arr1` (`T[]`): 第一个数组。
- `arr2` (`U[]`): 第二个数组。
- `mapper` (`(item: T) => U`): 将数组元素映射到比较值的函数。

### 返回值

(`T[]`): 包含来自 `arr1` 和 `arr2` 的唯一元素并按顺序排列的新数组，基于映射函数返回的值。

## 示例

```typescript
unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
// 返回 [{ id: 1 }, { id: 2 }, { id: 3 }]
```
